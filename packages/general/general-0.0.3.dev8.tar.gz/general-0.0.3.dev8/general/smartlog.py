#!/usr/bin/env python
# -*- coding: utf-8 -*-

import logging

FORMAT = ('%(module)s %(levelname)s [-] %(funcName)s: %(message)s')
ROOT_FORMAT = '%(module)s %(levelname)s [-] %(funcName)s: %(message)s'

# format 格式
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s: %(message)s')
# formatter = logging.Formatter('%(module)s %(levelname)s [-] %(funcName)s: %(message)s')
# 可以显示函数和行号
# %(module)s.
# %(name)s
# %(lineno)s

def set_root_logger(level = logging.INFO, filename=None,filemode = 'w', format = ROOT_FORMAT):
    # filename=os.path.basename(__file__)+'.rootlog'
    logging.basicConfig( level = level, filename=None, filemode = filemode, format = format)

def clear_logger(logger):
    logger.handlers=[]

def get_logger(name='rootlog', level = logging.INFO, console=False, filename=False, filemode='w',format=FORMAT,debug=False):
    # 创建一个logger
    if debug==True:
        level='DEBUG'
    if type(level) is str:
        level=level.upper()
        if level == 'DEBUG':
            level = logging.DEBUG
        elif level == 'INFO':
            level = logging.INFO
        elif level == 'WARNING':
            level = logging.WARNING
        elif level == 'ERROR':
            level = logging.ERROR
        elif level == 'CRITICAL':
            level = logging.CRITICAL

    logger = logging.getLogger(name)
    logger.setLevel(level)
    formatter=logging.Formatter(format)
    if filename:
        # 创建一个handler，用于写入日志文件
        fh = logging.FileHandler(filename,mode=filemode)
        fh.setLevel(level)
        fh.setFormatter(formatter)
        logger.addHandler(fh)

    if console:
        # 再创建一个handler，用于输出到控制台
        ch = logging.StreamHandler()
        ch.setLevel(level)
        ch.setFormatter(formatter)
        logger.addHandler(ch)

    return logger

if __name__ == '__main__':
    log=get_logger(name='first',level="INFO",console=True)
    # log=logging.getLogger('root')
    # set_root_logger()
    second=get_logger(name='first.second')
    second.info('second')
