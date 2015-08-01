import pygame
import time
import RPi.GPIO as io

io.setmode(io.BCM)
disarmPin = 12
io.setup(disarmPin, io.IN, pull_up_down=io.PUD_UP)

pygame.mixer.init()
pygame.mixer.music.load("siren.ogg")

def musicStart():
    pygame.mixer.music.play(-1,0)
    print("music start")

def musicStop():
    pygame.mixer.music.stop()
    print("music stop")

i = 0

try:
    while i < 1000:
      musicStart()
      time.sleep(.5)        
finally:
    io.cleanup()