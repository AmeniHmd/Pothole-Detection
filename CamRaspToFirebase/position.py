from firebase import firebase
import random

latitude = random.uniform(35.820,35.829)
longitude = random.uniform(10.590,10.599)
lat_long = str(latitude)+","+str(longitude)

firebase = firebase.FirebaseApplication('https://testhasni1234.firebaseio.com/',None)
result = firebase.post('/map',lat_long)


