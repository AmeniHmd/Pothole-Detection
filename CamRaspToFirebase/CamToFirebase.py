#!/usr/bin/python
import os
import pygame, sys
import time
from PIL import Image

import base64
import random
from firebase import firebase

from pygame.locals import *
import pygame.camera

width = 640
height = 480



firebase = firebase.FirebaseApplication('https://testhasni1234.firebaseio.com/',None)

#initialise pygame   
pygame.init()
pygame.camera.init()
cam = pygame.camera.Camera("/dev/video0",(width,height))
cam.start()
print('Server Started ...')

#setup window
windowSurfaceObj = pygame.display.set_mode((width,height),1,16)
pygame.display.set_caption('Camera')


#take a picture
while True :
    image = cam.get_image()
    #display the picture
    catSurfaceObj = image
    windowSurfaceObj.blit(catSurfaceObj,(0,0))
    pygame.display.update()
    #save picture
    pygame.image.save(image,'picture.jpg')
    with open ('picture.jpg','rb') as image_file :
        encoded = base64.b64encode(image_file.read())

    latitude = random.uniform(35.820,35.829)
    longitude = random.uniform(10.590,10.599)
    lat_long = str(latitude)+","+str(longitude)
        
    result_img = firebase.post('/images',encoded)
    result_pos = firebase.post('/map',lat_long)
    time.sleep(0.5)







