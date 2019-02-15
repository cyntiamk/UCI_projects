# Hawaii Trip
In this project a climate analysis will be performed in order to help planning a trip to Hawaii. 

## Tools and Resources:
* Python, SQLAlchemy ORM queries, Pandas and Matplotlib
* A sqlite file is provided with the climate database in Hawaii from 2010/01/01 to 2017/08/23
* 
* For the second portion of this project, Flask will be utilized. 

## Steps accomplished:
1. Create a jupyter notebook to hold all of the date exploration and analysis
2. Choose a start and end date for the trip with a range of 3-15 days total. 
3. Query the precipitation for the 12 months prior to the trip start date.
4. Load query results into a pandas DataFrame.
5. Plot a bar chart of the  precipitation over the 12 months queried.
6. Query all activities by station, get temperatures analysis from the most active station.
7. Query station with highest volume of temperature measuring and get all the 
temperature measuring for the 12 months. 
8. Plot a histogram wiht the temperatures for this specific station.
9. Query the temperatures for the specific dates of the trip and the exact same
dates but the previous year.
10. Plot a bar chart with the y_axis showing the average temperature and the yerr the ptps.
11. Query rainfall for each station, and display stations by descending order also showing their latitude, longitude and elevation.
12. Calculate the daily normals using the exact month and day of the trip for each equivalent year of existing data ***(Normals are the averages for the min, avg, and max temperatures) 
13. Using the queries developed, create the routes with Flask:

* `/api/v1.0/precipitation`

  * Query for the dates and temperature observations from the last year.

  * Convert the query results to a Dictionary using `date` as the key and `tobs` as the value.

  * Return the JSON representation of your dictionary.

* `/api/v1.0/stations`

  * Return a JSON list of stations from the dataset.

* `/api/v1.0/tobs`

  * Return a JSON list of Temperature Observations (tobs) for the previous year.

* `/api/v1.0/<start>` and `/api/v1.0/<start>/<end>`

  * Return a JSON list of the minimum temperature, the average temperature, and the max temperature for a given start or start-end range.

  * When given the start only, calculate `TMIN`, `TAVG`, and `TMAX` for all dates greater than and equal to the start date.

  * When given the start and the end date, calculate the `TMIN`, `TAVG`, and `TMAX` for dates between the start and end date inclusive.

  ### Limitations
  The dataset provided is not up-to-date so the trip dates had to be set in a past date, once the dateset is updated. The trip dates can be adjusted to a more current date.
  
  ## Copyright
 Data Boot Camp © 2018. All Rights Reserved.
