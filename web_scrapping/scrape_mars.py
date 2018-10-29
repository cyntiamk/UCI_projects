# Import dependencies and libraries
import pandas as pd
import os
from bs4 import BeautifulSoup as bs

from splinter import Browser

import json
import tweepy
from config import consumer_key, consumer_secret, access_token, access_token_secret


# create function to automate the chomedriver browser 
def init_browser():
    executable_path = {'executable_path':'/usr/local/bin/chromedriver'}
    return Browser('chrome', **executable_path, headless=False)

# create function to hold all the information scrapped
def scrape():
    browser = init_browser()

    # emprty dictionary to hold the scrapped information
    mars_data = {}

    # NASA Mars Latest News
    news_url = "https://mars.nasa.gov/news/"
    browser.visit(news_url)
    news_html = browser.html

    # use beautiful soup to parse the html and extract title and news paragraph
    news_soup = bs(news_html, 'html.parser')
    items = news_soup.find_all('ul',class_='item_list')
    for item in items:
        mars_data['news_title'] = item.find('div',class_='content_title').text
        mars_data['news_p'] = item.find('div', class_='article_teaser_body').text
  

    # JPL Mars Space Images
    img_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(img_url)
    img_html = browser.html
    img_soup = bs(img_html, 'html.parser')
    # use beautiful soup to parse the html and extract the link on the first page to 
    # get to the page with the link with the large size image
    feat = img_soup.find('footer')
    data_link = feat.find('a')['data-link']
    # with the data link scrapped, create the url with the link to the full image
    data_img = ('https://www.jpl.nasa.gov/' + data_link)

    # call the url scrapped above and scrape the url with the full image
    browser.visit(data_img)
    feat_img_html = browser.html
    feat_img_soup = bs(feat_img_html, 'html.parser')
    feat_img = feat_img_soup.find('figure', class_='lede')
    feat_img_href = feat_img.find('a')['href']

    mars_data['featured_image_url'] = (f'https://www.jpl.nasa.gov/' + feat_img_href)
    
    #Mars Weather
    # for the current weather, I decided it would be more ethical to 
    # use the twitter API since it was discussed in class that Twitter provides 
    # free public API to try to prevent people from scrapping their page

    # Setup Tweepy API authentications
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())

    # target user for Mars Weather
    target_user = "MarsWxReport"

    # get tweets from target
    tweets = api.user_timeline(target_user, page=1, result_type="recent")

    mars_weather = tweets[0]['text']
    mars_data['weather'] = mars_weather

    # Mars Facts
    facts_url = "https://space-facts.com/mars/"

    # used pandas 
    table = pd.read_html(facts_url)

    # extracted the table, since it was only on table on this url
    # set the index to 0 dropped the header and index
    # store the table in a string in the dictionary
    mars_table_to_html =table[0].to_html(header=False, index=False)
    mars_data['fact'] = mars_table_to_html


    # Hemispheres
    hem_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(hem_url)

    link_list = []
    url_list = []

    # first rendered the front page of hemisphers and scrapped the pages with full
    # image of each hemisphere
    hem_html = browser.html
    hem_soup = bs(hem_html, 'html.parser')
    results = hem_soup.find_all('div',class_='item')
    for result in results:
        link = result.find('a')['href']
        link_list.append(link)
        
    url_list = ['https://astrogeology.usgs.gov/'+ link for link in link_list]

    # empty list to store a dictonaries with each hemispheres img url and title
    hemisphere_images = []

    # looped through each page and rendered the img url and title

    for page in url_list:      
        page_url = page
        browser.visit(page_url)
        page_html = browser.html
        page_soup = bs(page_html, 'html.parser')
            
        title = page_soup.find('h2',class_='title').text
      
        image = page_soup.find('img', class_='wide-image')
        img_url = (f"https://astrogeology.usgs.gov" + image["src"])
        hem_dict = {'title':title,
                    'img_url':img_url}
        hemisphere_images.append(hem_dict)
    # store list of dictionaries into the main dictionary
    mars_data['hemisphere_images']=hemisphere_images

    browser.quit()    
    return mars_data
#data = scrape()
#print(data)


    


