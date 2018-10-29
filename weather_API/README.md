# Weather API project
Use Python requests, APIs, and JSON traversals to answer a fundamental question: "What's the weather like as we approach the equator?"

Create a Python script to visualize the weather of 500+ cities across the world of varying distance from the equator. To accomplish this, utilize a [simple Python library](https://pypi.python.org/pypi/citipy), the [OpenWeatherMap API](https://openweathermap.org/api).
The objective is to build a series of scatter plots to showcase the following relationships:

* Temperature (F) vs. Latitude
* Humidity (%) vs. Latitude
* Cloudiness (%) vs. Latitude
* Wind Speed (mph) vs. Latitude

The final notebook displays:

* Randomly select **at least** 500 unique (non-repeat) cities based on latitude and longitude.
* Perform a weather check on each of the cities using a series of successive API calls.
* Include a print log of each city as it's being processed with the city number and city name.
* Save both a CSV of all data retrieved and png images for each scatter plot.

Tools:

* Jupyter notebook.
* Matplotlib or Pandas plotting libraries.


## Copyright

Data Boot Camp © 2018. All Rights Reserved.
