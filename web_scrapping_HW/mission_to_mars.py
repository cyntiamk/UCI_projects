
# coding: utf-8

# In[1]:


import pandas as pd
import os
from bs4 import BeautifulSoup as bs
import requests


# In[2]:


from splinter import Browser
from splinter.exceptions import ElementDoesNotExist


# In[3]:


import json
import tweepy
from config import consumer_key, consumer_secret, access_token, access_token_secret


# ### NASA Mars News

# In[4]:


get_ipython().system('which chromedriver')


# In[5]:


executable_path = {'executable_path':'/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)


# In[6]:


news_url = "https://mars.nasa.gov/news/"
browser.visit(news_url)


# In[7]:


news_html = browser.html
news_soup = bs(news_html, 'html.parser')
#print(news_soup.prettify())


# In[8]:


items = news_soup.find_all('ul',class_='item_list')
for item in items:
    news_title = item.find('div',class_='content_title').text
    news_p = item.find('div', class_='article_teaser_body').text
    print("----------------")
    print("Latest News")
    print(f"Title: "+news_title)
    print(news_p)
    


# ### JPL Mars Space Images

# In[9]:


get_ipython().system('which chromedriver')


# In[10]:


executable_path = {'executable_path':'/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)


# In[ ]:


img_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(img_url)


# In[ ]:


img_html = browser.html
img_soup = bs(img_html, 'html.parser')
#print(img_soup.prettify())


# In[ ]:


#featured = img_soup.find_all(
feat = img_soup.find('footer')
data_link = feat.find('a')['data-link']
data_img = ('https://www.jpl.nasa.gov/' + data_link)

browser.visit(data_img)
feat_img_html = browser.html
feat_img_soup = bs(feat_img_html, 'html.parser')
feat_img = feat_img_soup.find('figure', class_='lede')
feat_img_href = feat_img.find('a')['href']



# In[ ]:


featured_image_url = (f'https://www.jpl.nasa.gov/' + feat_img_href)


# In[ ]:


featured_image_url


# ### Mars Weather

# In[ ]:


# Setup Tweepy API authentications
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())


# In[ ]:


# target user for Mars Weather
target_user = "MarsWxReport"


# In[ ]:


# get tweets from target
tweets = api.user_timeline(target_user, page=1, result_type="recent")


# In[ ]:


mars_weather = tweets[0]['text']
mars_weather


# ### Mars Facts

# In[ ]:


facts_url = "https://space-facts.com/mars/"


# In[ ]:


table = pd.read_html(facts_url)
columns_renamed = table[0].rename(columns={0:"Description", 1:"Value"})
mars_facts = columns_renamed.set_index('Description')
facts = mars_facts.to_dict('series')
mars_facts.to_html('mars_facts.html')


# ### Mars Hemispheres

# In[ ]:


get_ipython().system('which chromedriver')


# In[ ]:


executable_path = {'executable_path':'/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)


# In[ ]:


hem_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
browser.visit(hem_url)


# In[ ]:


link_list = []
url_list = []


hem_html = browser.html
hem_soup = bs(hem_html, 'html.parser')
results = hem_soup.find_all('div',class_='item')
for result in results:
    link = result.find('a')['href']
    link_list.append(link)
    
url_list = ['https://astrogeology.usgs.gov/'+ link for link in link_list]


# In[ ]:


hemisphere_images = []

for page in url_list:      
    page_url = page
    browser.visit(page_url)
    page_html = browser.html
    page_soup = bs(page_html, 'html.parser')
        
    title = page_soup.find('h2',class_='title').text
  
    image = page_soup.find('img', class_='wide-image')
    img_url = (f"https://astrogeology.usgs.gov" + image["src"])

    hem_dict = {
        'title': title,
        'img_url': img_url
    }
    hemisphere_images.append(hem_dict)


# In[ ]:


hemisphere_images


# In[ ]:


get_ipython().system('jupyter nbconvert --to script mission_to_mars.ipynb')

