import React from 'react';
import ReactDOM from 'react-dom';
import BubbleChart from './components/bubblechart';
import FrequencyChart from './components/frequencybarchart';


var data = [{"id":"categories","value":""},
            {"id":"categories.email","value":" "},
            {"id":"categories.email.property","value":""},
            {"id":"categories.email.property.Sender","value":"2"},
            {"id":"categories.email.property.Receiver","value":"2"},
            {"id":"categories.email.property.date","value":"2"},
            {"id":"categories.email.property.time","value":"2"},
            {"id":"categories.chat","value":" "},
            {"id":"categories.chat.property","value":""},
            {"id":"categories.chat.property.Sender","value":"2"},
            {"id":"categories.chat.property.Receiver","value":"2"},
            {"id":"categories.chat.property.date","value":"2"},
            {"id":"categories.chat.property.time","value":"2"},            
            {"id":"categories.music","value":""},
            {"id":"categories.music.property","value":""},
            {"id":"categories.music.property.Title","value":"3"},
            {"id":"categories.music.property.Length","value":"3"},
            {"id":"categories.music.property.Type","value":"3"},
            {"id":"categories.music.property.Quality","value":"2"},
            {"id":"categories.video","value":""},
            {"id":"categories.video.property","value":""},
            {"id":"categories.video.property.Title","value":"3"},
            {"id":"categories.video.property.Length","value":"3"},
            {"id":"categories.video.property.Type","value":"3"},
            {"id":"categories.video.property.Quality","value":"2"},
            {"id":"categories.albums","value":""},
            {"id":"categories.albums.property","value":""},
            {"id":"categories.albums.property.Title","value":"3"},
            {"id":"categories.albums.property.Length","value":"3"},
            {"id":"categories.albums.property.Type","value":"3"}];

var chartData = [
    {"id": "email ", "value": 8},
    {"id": "chat ", "value": 8},
    {"id": "music ", "value": 11},
    {"id": "video ", "value": 11},
    {"id": "albums ", "value": 9}
];

ReactDOM.render(
  <div>
  	<FrequencyChart title="Categories Frequency Chart" model={chartData}></FrequencyChart>
  	<BubbleChart model={data} title="Categories Bubble Chart"></BubbleChart>  	
  </div>		
  ,
  document.getElementById('app')
);