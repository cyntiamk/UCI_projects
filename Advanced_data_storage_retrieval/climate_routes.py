import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

import numpy as np

import datetime as dt

engine = create_engine("sqlite:///hawaii.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(engine)

app = Flask(__name__)

@app.route("/")
def welcome():
    return(
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/2017-07-08<br/>"
        f"/api/v1.0/2017-07-08/2017-07-15<br/>"
    )

start= dt.date(2017, 7, 8)
end = dt.date(2017, 7, 15)

first_day = start.strftime('%Y-%m-%d')
last_day = end.strftime('%Y-%m-%d')

query_start = dt.date(2017, 7, 8) - dt.timedelta(365)
query_start_date = query_start.strftime('%Y-%m-%d')

@app.route("/api/v1.0/precipitation")
def precipitation():
    session = Session(engine)

    query_precipitation = session.query(Measurement.date, Measurement.prcp).\
    filter(Measurement.date >= query_start_date).\
    filter(Measurement.date <= last_day).\
    group_by(Measurement.date).all()

    # load the results from the variable created into Pandas dataframe 
    measurement_df = pd.DataFrame(query_precipitation)
    # set index on date
    measurement_df.set_index('date', inplace=True)
    # sort values by date
    measurement_dict = measurement_df.to_dict()
  
    return jsonify(measurement_dict)


@app.route("/api/v1.0/stations")
def stations():

    session = Session(engine)
    query_stations = session.query(Station).all()

    stations_detail =[]

    for station in query_stations:

        station_dict = {}

        station_dict['id'] = station.id
        station_dict['Station'] = station.station
        station_dict['Name'] = station.name
        station_dict['Latitude'] = station.latitude
        station_dict['Longitude'] = station.longitude
        station_dict['Elevation'] = station.elevation

        stations_detail.append(station_dict)
    return jsonify(stations_detail)


@app.route("/api/v1.0/tobs")
def tobs():

    session = Session(engine)

    query_tobs = session.query(Measurement.date,Measurement.tobs).\
    filter(Measurement.date >= query_start_date).\
    filter(Measurement.date <= last_day).all()

    tobs_prev_year = []

    for temp in query_tobs:

        tobs_dict = {}

        tobs_dict['date'] = temp.date
        tobs_dict['tobs'] = temp.tobs
        
        tobs_prev_year.append(tobs_dict)
    return jsonify(tobs_prev_year)

@app.route("/api/v1.0/2017-07-08")
def start_date():

    session = Session(engine)

    results = session.query(Measurement.date,\
    func.min(Measurement.tobs).label('tmin'),\
    func.max(Measurement.tobs).label('tmax'),\
    func.avg(Measurement.tobs).label('tavg')).\
    filter(Measurement.date >= first_day).\
    group_by(Measurement.date).all()

    tobs_start_date = []

    for temp in results:

        start_dict = {}

        start_dict['Date'] = temp.date
        start_dict['Tmin'] = temp.tmin
        start_dict['Tmax'] = temp.tmax
        start_dict['Tavg'] = temp.tavg
        
        
        tobs_start_date.append(start_dict)
    return jsonify(tobs_start_date)

@app.route("/api/v1.0/2017-07-08/2017-07-15")
def end_date():

    session = Session(engine)

    results = session.query(Measurement.date,\
    func.min(Measurement.tobs).label('tmin'),\
    func.max(Measurement.tobs).label('tmax'),\
    func.avg(Measurement.tobs).label('tavg')).\
    filter(Measurement.date >= first_day).\
    filter(Measurement.date <= last_day).\
    group_by(Measurement.date).all()

    tobs_trip = []

    for temp in results:

        trip_dict = {}

        trip_dict['Date'] = temp.date
        trip_dict['Tmin'] = temp.tmin
        trip_dict['Tmax'] = temp.tmax
        trip_dict['Tavg'] = temp.tavg
        
        
        tobs_trip.append(trip_dict)
    return jsonify(tobs_trip)
    
if __name__ == '__main__':
    app.run(debug=True)