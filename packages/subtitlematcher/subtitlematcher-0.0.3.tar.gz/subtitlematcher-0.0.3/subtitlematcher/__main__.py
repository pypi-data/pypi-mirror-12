#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
import sys

VIDEO_FORMAT    = ('avi', 'flv', 'mkv', 'm4p', 'm4v', 'mp4', 'mpeg', 'mpg', 'webm', 'wmv')
SUBTITLE_FORMAT = ('ass', 'srt', 'ssa' ,'sub')

def get_files(_format, files):
    return sorted(filter(lambda f: f.split('.')[-1] in _format, files))

def match_name(movies, subtitles):
    for (movie, subtitle) in zip(movies, subtitles):
        new_name = '.'.join(movie.split('.')[:-1])+'.'+subtitle.split('.')[-1] 
        try:
            os.rename(subtitle, new_name)
            print "Success!!!"
        except:
            print "Oops! Somehow I cannot match the subtitle for you. Sorry man..."
            pass

def main(args=None):
    os.chdir(str(sys.argv[1]) if len(sys.argv) > 1 else os.getcwd())
    files_in_movie_dir = os.listdir(os.getcwd())
    if len(files_in_movie_dir) == 0:
        print "There's nothing here. I'm leaving..."
    else:
        movies    = get_files(VIDEO_FORMAT, files_in_movie_dir)
        subtitles = get_files(SUBTITLE_FORMAT, files_in_movie_dir)
        match_name(movies, subtitles)
        print ">>> Done!!! <<<"
    
if __name__ == '__main__':
    main()
