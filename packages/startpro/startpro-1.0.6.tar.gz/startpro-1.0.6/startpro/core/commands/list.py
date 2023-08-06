# encoding: utf-8

'''
Created on 2014年.05.26

@author: Allen
'''
from startpro.core.topcmd import TopCommand
from startpro.core.utils.opts import get_script

options = {"-full": "if need full path name of script"}


class Command(TopCommand):
    '''
    classdocs
    '''

    def __init__(self):
        '''
        Constructor
        '''
        
    def run(self, **kwargvs):
        print('[INFO]:script list:')
        for i, k in enumerate(sorted(get_script(kwargvs.get('paths', []), bool(kwargvs.get('full', False))).keys())):
            print('----> %d: %s' % (i, k))
    def help(self, **kwargvs):
        print('Lists all program.')
        print('')
        print("Available options:")
        for name, desc in sorted(options.iteritems()):
            print("  %-13s %s" % (name, desc))