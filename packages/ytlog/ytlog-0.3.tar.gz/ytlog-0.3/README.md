rlog - log module for humans 
============================

We use logging everyday, bug it's easy to forget how to use buildin 
logging module of Python, because the configuration looks complicated. 

So I copy log.py module from [Tornado(github)](https://github.com/facebook/tornado)


	pip install rlog


How to use
----------
    
    from rlog import get_logger

    log = get_logger({"name": "app"})
    log.info("Mission starts.")


Then we will see logging in console and log file under directory /data/logs/

![screenshot](./screenshot.png)

So easy! 


If you want to change log file path, just add arg "dir" 

e.g.

log = get_logger({"name": "app", "dir": "./"})
