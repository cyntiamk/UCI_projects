from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")

# create route to connect the app
@app.route('/')
def index():
	# create variable to hold all items in the database
	mars_data = mongo.db.mars_data.find_one()
	# render index.html template and pass data retrieved from database
	return render_template('index.html', mars_data=mars_data)

# create route to connect the app to the function
@app.route('/scrape')
def scrape():
	# call the same variable that holds all the items in the database
	mars_data = mongo.db.mars_data
	# call the function that holds the dict with all the scrapped items
	data = scrape_mars.scrape()
	# add each item int a dictionary
	mars_data.update(
		{},
		data,
		upsert=True
		)
	return redirect("/", code=302)

if __name__ == "__main__":
	app.run(debug=True)
