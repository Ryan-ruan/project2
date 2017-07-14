# README

# Project 2 - PikQ

## Description

Developing websites involves working in groups where its members have different ideas, tasks delegated, and versions of have to be controlled and reconciled when using the GitHub. The purpose of the project is to make and develop a website in a group. Our group is comprised of:

1. Weijia Li
2. Lingxiao Wang
3. Ryan Ruan
4. Jonathan See

## Features

PikQ is a website developed to allow users to take pictures from their webcams. These pictures can be edited and posted to their profiles which in turn appear in the gallery. Users can also comment on and "Like" posts from other users.

The group utilized the following applications to achieve a functional yet visually appealing website:

Ruby
* Ruby on Rails - wireframe upon which the website is built
* [acts_as_votable](https://github.com/ryanto/acts_as_votable) - Ruby Gem used for the upvotes ("Like") of the posts

JS Libraries
* [fabric js](http://fabricjs.com/) - allows users to edit images by changing and adding stickers, drawings and texts to it
* [webcam js](https://github.com/jhuckaby/webcamjs) - enables PikQ to obtain data from the users' webcams and take pictures
* [tracking js](https://trackingjs.com/) - detects users' faces as they move which in turn can be superimposed by another image (e.g. other people's faces)

Plugin
* [AddThis](http://www.addthis.com/) - allows users to share their edited images to social media sites such as Facebook, Pinterest, Weibo and Yummly.

API
* [imgurAPI](https://apidocs.imgur.com/) - allows users to upload their edited images unto imgur anonymously

CSS Framework
* [Semantic-UI](https://semantic-ui.com/) - responsible for creating a clean and presentable website
* [Colorzilla](http://www.colorzilla.com/gradient-editor/)responsible for the purple gradient background appearing throughout the website

Cloud Platforms
* [Cloudinary](http://cloudinary.com/) - responsible for storing all the images saved in PikQ
* [Heroku](https://www.heroku.com/) - where PikQ is deployed


## Result
Here is [our live site](https://pikq.herokuapp.com)

![pikQ](.png)

## Lessons Learned

* The most useful important learned in working in groups is that conflicts will inevitably arise so resolving these quickly saves time which can be devoted to completing tasks.

* Planning from the beginning by listing and delegating tasks helps keep the team on track.

* Never be afraid to explore other applications to give the website the best user experience.



## Wish List



## Acknowledgments

We would like to thank Luke Hammer for leading us to the right direction by introducing us to webcamjs, trackingjs and AddThis and helping us fix the bugs in our face detection feature. We also would like to thank Matthew Edge-Williams for answering our queries and assisting us with the Github-related problems.

Lastly proper acknowledgments goes to the following:
* [freepik](http://www.freepik.com/) - source of the sticker used in the editor function of PikQ
* [I Hate Tomatoes](https://ihatetomatoes.net/how-to-create-css-glitch-effect/) - tutorial on how to create a CSS glitch effect on PikQ when hovered on the welcome page
