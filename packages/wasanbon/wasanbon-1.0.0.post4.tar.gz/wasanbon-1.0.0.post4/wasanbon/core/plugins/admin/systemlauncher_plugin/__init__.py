import os, sys, types, traceback, time

import wasanbon
from wasanbon.core.plugins import PluginFunction, manifest

# from rtshell import rtexit, path, rts_exceptions

class Plugin(PluginFunction):

    def __init__(self):
        #PluginFunction.__init__(self)
        super(Plugin, self).__init__()
        pass

    def depends(self):
        return ['admin.environment', 'admin.systeminstaller', 'admin.rtcconf', 'admin.rtc']

    
    def launch_system(self, package,
                      languages = ['C++', 'Java', 'Python'],
                      verbose=False, console_bind=''):

        if not type(console_bind) is types.ListType:
            console_bind = [console_bind]
        if verbose:
            console_bind = languages
        for lang in languages:
            console_output = True if lang in console_bind else False
            process = self.launch_rtcd(package, lang, verbose=console_output)
        pass

    def terminate_system(self, package, verbose=False):
        languages = ['C++', 'Java', 'Python']
        for lang in languages:
            self.terminate_rtcd(package, lang, verbose=verbose)

    def _get_rtcd_pid(self, package, language, verbose=False, autoremove=False):
        pids = []
        piddir = os.path.join(package.path, 'pid')
        if not os.path.isdir(piddir):
            return pids
        for f in os.listdir(piddir):
            if f.startswith('rtcd_'+language+'_'):
                pid = int(f[len('rtcd_'+language+'_'):])
                pids.append(pid)
                if autoremove:
                    os.remove(os.path.join(piddir, f))
            
        return pids

    def is_rtcd_launched(self, package, language, verbose=False, autoremove=False):
        pids = self._get_rtcd_pid(package, language, verbose=verbose, autoremove=autoremove)
        import psutil
        for proc in psutil.process_iter():
            for pid in pids:
                if proc.pid == pid:
                    return True
        return False

    def is_launched(self, package, verbose=False, autoremove=False):
        langs = ['C++', 'Python', 'Java']
        flag = False
        for lang in langs:
            flag = flag or self.is_rtcd_launched(package, lang, verbose=verbose, autoremove=autoremove)
        return flag

    def terminate_rtcd(self, package, language, verbose=False):
        if verbose: sys.stdout.write('# Terminating rtcd for language (%s) in package (%s)\n' % (language, package.name))
        pids = self._get_rtcd_pid(package, language, verbose=verbose, autoremove=True)
        import psutil
        for proc in psutil.process_iter():
            for pid in pids:
                if proc.pid == pid:
                    if verbose: sys.stdout.write('## Kill Process (%d)\n' % pid)
                    try:
                        proc.kill()
                    except psutil.AccessDenied, ex:
                        sys.stdout.write('## Access Denied to pid(%s).\n' % pid)
        return 0


    def launch_rtcd(self, package, language, rtcconf="", verbose=False):
        piddir = 'pid'
        logdir = 'log'
        if not os.path.isdir(logdir):
            os.mkdir(logdir)
        if not os.path.isdir(piddir):
            os.mkdir(piddir)


        if self.is_rtcd_launched(package, language, verbose=verbose):
            self.terminate_rtcd(package, language, verbose=verbose)

        if len(rtcconf) == 0:
            rtcconf = package.rtcconf[language]
            
        installed_rtcs = admin.systeminstaller.get_installed_rtc_names(package, language=language,
                                                                       verbose=verbose)
        if verbose: sys.stdout.write('# In Package %s, RTC (%s : lange=%s) are installed.\n' % (package.name, installed_rtcs, language))
        process = None
        if len(installed_rtcs) > 0:
            if verbose: sys.stdout.write('# Starting RTC-Daemon %s version.\n' % language)
            import run
            process = start_rtcd(package, language, rtcconf, verbose)
            if verbose: sys.stdout.write('# Save rtcd_'+language+'_' + str(process.pid) + '\n')
            open(os.path.join(piddir, 'rtcd_'+language+'_' + str(process.pid)), 'w').close()
        return process

    def exit_all_rtcs(self, package, verbose=False, try_count=5, wait_time=1.0):
        """ Exit All RTCs on package. """
        if verbose: sys.stdout.write('## Exitting All RTCS on package %s\n' % package.name)
        mgr_addrs = admin.systeminstaller.get_rtcd_manager_addresses(package, verbose=verbose)
        if verbose: sys.stdout.write('# Parsing manager : %s\n' % mgr_addrs)
        for lang in ['C++', 'Java', 'Python']:
            sys.stdout.write('# Getting Manager for language (%s)\n' % lang)
            for mgr_addr in mgr_addrs[lang]:
                cleaned = False
                if not mgr_addr.startswith('/') : mgr_addr = '/' + mgr_addr
                from rtshell import path
                full_path = path.cmd_path_to_full_path(mgr_addr)
                mgr = None
                for i in range(0, try_count):
                    if verbose: sys.stdout.write('## Getting Manager [%s]\n' % mgr_addr)
                    from rtshell import rts_exceptions
                    from rtshell.rtmgr import get_manager
                    try:

                        tree, mgr = get_manager(mgr_addr, full_path)
                        break
                    except rts_exceptions.ZombieObjectError, e:
                        if i == try_count-1:
                            sys.stdout.write('# ZombieObjectError Occured when exit_all_rtcs\n')
                            traceback.print_exc()
                            return -1
                    except rts_exceptions.NoSuchObjectError, e:
                        break
                if mgr:
                    if len(mgr.components) == 0:
                        if verbose: sys.stdout.write('### Manager (%s) has no RTCs.\n' % mgr_addr)
                        cleaned = True
                    else:
                        for r in mgr.components:
                            if verbose: sys.stdout.write('### Exitting RTC (%s)\n' % r.instance_name)
                            r.exit()

                        for i in range(0, try_count):
                            time.sleep(wait_time)
                            if verbose: sys.stdout.write('## Getting Manager [%s] Again\n' % mgr_addr)
                            tree, mgr = get_manager(mgr_addr, full_path)
                            if len(mgr.components) == 0:
                                if verbose: sys.stdout.write('### Manager (%s) has no RTCs.\n' % mgr_addr)
                                cleaned = True
                                break
                            else:
                                if verbose: sys.stdout.write('### Manager (%s) still have RTCs.\n' % mgr_addr)
                                pass

                    if cleaned: break
                else:
                    if verbose: sys.stdout.write('## Getting Manager failed.\n')
                    break
        sys.stdout.write('# Exitting All RTCs done.\n')
        return 0


def start_rtcd(pkg, language, filepath, verbose=False):
    import run
    if language == 'C++':
        return run.start_cpp_rtcd(filepath, verbose=verbose)
    elif language == 'Java':
        rtcs = admin.rtc.get_rtcs_from_package(pkg, verbose=verbose)
        cmd_path = admin.environment.path['java']
        return run.start_java_rtcd(rtcs, filepath, verbose=verbose, cmd_path=cmd_path)
    elif language == 'Python':
        return run.start_python_rtcd(filepath, verbose=verbose)
    else:
        raise wasanbon.UnsupportedPlatformException()
