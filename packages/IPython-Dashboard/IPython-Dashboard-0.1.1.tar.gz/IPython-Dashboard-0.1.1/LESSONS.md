
### Lessons Learned from this Side Project


- ***Version control is god***
    + Your code version control 
    + Explicitly point out the version of packages/libs used by you; In python, put them into requirements.txt and then can use `pip install -r requirements.txt`; for js, I'm not that familiar with it, so I put the version code as a suffix of the source code;

- ***Add a comma after the last element of your list***
    + Wiser choice `the_list = [1, 2, 3, 4, ]`
    + Exceptions : if you will use that list to build a SQL, then should and must remove the last comma after the last element, otherwise will cause a syntax error.

```
glow=> select count(*) from metrics where os not in ('ios', 'android', ) ;
ERROR:  syntax error at or near ")"
LINE 1: ...count(*) from metrics where os not in ('ios', 'android', ) ;
```

- ***Doc, doc and doc***
    + start write doc as soon as possible, before release the MVP, doc should be ready.
    + For python, use [google style](https://google-styleguide.googlecode.com/svn/trunk/pyguide.html)

- ***Code re-structure and re-factory*** 
    + for starting a new project, there will be some functional or solutional test, which is necessary but will messing up the code base, so before each small release and milestone, you should clean up the code, and re-factory it if needed.

- ***Write compatible code***
    + for python, you should know something about the compatibility of Python 2 and Python 3, the tutorial will be much helpful, [python-future](http://python-future.org/compatible_idioms.html)

- ***Demo, demo and demo***
    + A live-demo is the most efficiently way the let people know what you've created.
    + Screenshots works fine in most times.
    + If need code, make it as formatted as possible and simple enough.

- ***Test, test and test***
    + Before mvp, please add some tests, that's necessary in every possible way when people taking a look at what you've done.
    + Unit test can create test data for your app, like what I've done in `dashboard.tests.testCreateData.py`.
    + Unit test can help you build a powerful mind when building tools.
    + Unit test can impress people that you are seriously doing what you are doing.
    + Unit test can make people feel safe before the download the project or use the app.
    + When write unit tests, use [travis-ci](travis-ci.org) for [Continous Integration](https://en.wikipedia.org/wiki/Continuous_integration) is a wise choice.



