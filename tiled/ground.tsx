<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.10" tiledversion="1.11.0" name="ground" tilewidth="32" tileheight="32" tilecount="8" columns="4">
 <image source="../public/assets/ground.png" width="128" height="64"/>
 <tile id="1">
  <properties>
   <property name="collide" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="4">
   <object id="6" name="Stone" x="2" y="3" width="28" height="27"/>
  </objectgroup>
 </tile>
 <tile id="2">
  <properties>
   <property name="pickup" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="3">
   <object id="2" name="Mushroom" x="16" y="17" width="14" height="13"/>
  </objectgroup>
 </tile>
 <tile id="3">
  <properties>
   <property name="pickup" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" name="Flower" x="8" y="2" width="22" height="28"/>
  </objectgroup>
 </tile>
 <tile id="4">
  <properties>
   <property name="collide" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="1" y="6" width="28" height="24"/>
  </objectgroup>
 </tile>
 <tile id="5">
  <properties>
   <property name="collide" type="bool" value="true"/>
  </properties>
  <objectgroup draworder="index" id="2">
   <object id="1" x="1" y="0" width="29" height="32"/>
  </objectgroup>
 </tile>
 <tile id="7">
  <objectgroup draworder="index" id="2">
   <object id="1" x="0" y="0" width="32" height="32">
    <properties>
     <property name="collide" type="bool" value="true"/>
    </properties>
   </object>
  </objectgroup>
 </tile>
</tileset>
