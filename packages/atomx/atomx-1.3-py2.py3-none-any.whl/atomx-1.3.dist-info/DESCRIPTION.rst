Python Atomx Api
================

Interface for the atomx rest api.

For more information read the full
`documentation online <http://atomx-api-python.readthedocs.org/en/latest/index.html>`_,
report bugs in `github <https://github.com/atomx/atomx-api-python>`_
or see the `atomx wiki <http://wiki.atomx.com/doku.php?id=api>`_


Example Usage
-------------

.. code-block:: python

    from atomx import Atomx

    # create atomx session
    atomx = Atomx('user@example.com', 'password')

    # get 10 creatives
    creatives = atomx.get('Creatives', limit=10)
    # the result is a list of `atomx.models.Creative` models
    # that you can easily inspect, manipulate and update
    for creative in creatives:
        print('Creative ID: {c.id}, state: {c.state}, '
              'name: {c.name}, title: {c.title}'.format(c=creative))

    # update title for the first creative in list
    creative = creatives[0]
    creative.title = 'shiny new title'
    # the session is inherited from `atomx` that made the get request
    creative.save()


    # create a new profile
    from atomx.models import Profile
    profile = Profile(advertiser_id=23, name='test profile')
    # Note that you have to pass it a valid `Atomx` session for create
    # or use `atomx.create(profile)`
    profile.create(atomx)

    # now you could alter and update it like the creative above
    profile.name = 'changed name'
    profile.save()


    # you can also get attributes
    profiles = atomx.get('advertiser', 88, 'profiles')
    # equivalent is to pass the complete resource path as string instead of arguments
    profiles = atomx.get('advertiser/88/profiles')  # same as above
    # profiles is now a list of `atomx.models.Profile` that you can
    # read, update, etc again.
    profiles[0].click_frequency_cap_per = 86400
    profiles[0].save()


    # working with search
    s = atomx.search('mini*')
    # s is now a dict with lists of search results for the different models
    # with the model id and name

    publisher = s['publisher'][0]  # get the first publisher..
    publisher.reload()  # .. and load all the data
    print(publisher)  # now all publisher data is there


    # reporting example
    # get a report for a specific publisher
    report = atomx.report(scope='publisher', groups=['hour_formatted'], sums=['impressions', 'clicks'], where=[['publisher_id', '==', 42]], from_='2015-02-08 00:00:00', to='2015-02-09 00:00:00', timezone='America/Los_Angeles')
    # check if report is ready
    print(report.is_ready)
    # if pandas is installed you can get the pandas dataframe with `report.pandas`
    # you can also get the report csv in `report.content` without pandas
    df = report.pandas
    # set index to datetime
    import pandas as pd
    df.index = pd.to_datetime(df.pop('hour_formatted'))
    # calculate mean, median, std per hour
    means = df.resample('H', how=['mean', 'median', 'std'])
    # and plot impression and clicks per day
    means['impressions'].plot()
    means['clicks'].plot()


Installation
------------

To install the python atomx api, simply:

.. code-block:: bash

    $ pip install atomx

or if you want to use ipython notebook and reporting functionality:

.. code-block:: bash

    $ pip install atomx[report]


1.3
---

- Add :meth:`atomx.Atomx.delete` to send a ``HTTP DELETE`` request to the api
- :meth:`atomx.Atomx.get` and :meth:`atomx.Atomx.delete` accept non-keyword arguments
  that are used to compute the final resource path
- Add `emails` parameter to :meth:`atomx.Atomx.report`
- Model attributes that are dates get automatically converted to a python :mod:`datetime`
- When saving a model, dates, sets and decimals get automatically converted
  to there json counterpart
- Add `save_response` parameter to :class:`atomx.Atomx` to save the response meta data
  of the last api call.

1.2
---

- You can now remove model attributes with `del`
- Add :meth:`atomx.models.Report.csv` property that returns the report content as a list
- Save logged in user as `user` property to :class:`atomx.Atomx`
- Add network reports
- Try to determine report scope from user access rights if no scope was specified


1.1
---

- Fix: setup.py not working under some environments (`open` used wrong codec)
- Add SellerProfile model
- Add `offset` parameter to :meth:`atomx.models.Report.get`


1.0
---

- First release


