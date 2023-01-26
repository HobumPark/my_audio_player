var audio = null;
var file_path = "./my_audio/music";
var file_count = 8;

var cover_path = "./images/cover";

var audio_list = new Array(5);
var index = 0;
var min = 0; //3분
var sec = 0; //57초
var full_play_time = 0; //3:57
var current_time_tick = 0; //현재 흐른시간 측정
var ret_val = null; //setInterval이 반환한값 저장

var cur_min=0; //현재 재생시간 (분)
var cur_sec=0; //현재 재생시간 (초)
var cur_time_full='';

var music_info=[
	{artist:'NewJeans',title:'Ditto'},
	{artist:'NewJeans',title:'OMG'},
	{artist:'윤하',title:'사건의 지평선'},
	{artist:'테이',title:'Monologue'},
	{artist:'성시경',title:'너의 모든 순간'},
	{artist:'주호',title:'잘가요'},
	{artist:'최유리',title:'그댄 행복에 살텐데'},
	{artist:'르세라핌',title:'Antifragile'},
]
var music_playing=false;

var fileName = null
var musicImage = null
var title = null
var artist = null
var startPauseImg = null
var playTime = null
var currentTime = null

$(document).ready(function () {
	fileName = document.getElementById("file-name")
	musicImage = document.getElementById("music-image")
	title = document.getElementById("title")
	artist = document.getElementById("artist")
	startPauseImg=document.getElementById("start-pause-img")
	playTime = document.getElementById("play-time")
	currentTime = document.getElementById("current-time")
});
/*
음악정보
음악1: 아티스트:아이유, 제목:strawberry moon
음악2: 아티스트:에스파, 제목:savage
음악3: 아티스트:BTS, 제목:permission to dance
var music_info=[{},{},{}]
var music_info=[
	{artist:'IU',title:'strawberry moon'},
	{artist:'에스파',title:'savage'},
	{artist:'BTS',title:'permission to dance'}
	]
*/

$(window).load(function () {
	
	for (var i = 0; i < file_count; i++) {
		audio_list[i] = new Audio();
		audio_list[i].src = file_path + (i+1)+".mp3";
	}
	fileName.innerText = file_path + "1.mp3";
	musicImage.setAttribute("src",cover_path+"1.jpg")
	title.innerText=music_info[0].title;
	artist.innerText=music_info[0].artist;
	
	index=0;
	for (var i = 0; i < file_count; i++) {
		init_side_list(cover_path+(i+1)+".jpg",music_info[i].artist,music_info[i].title,0)
	}

	//sideList click event
	sideListClickEventEnroll(audio_list)
	console.log(audio_list)
});

function start_pause_music(){
	if(music_playing==false){
		music_playing=true
		startPauseImg.setAttribute("src","./images/pause.jpg");
		start_music(index)
	}else{
		music_playing=false
		startPauseImg.setAttribute("src","./images/play.jpg");
		pause_music(index)
	}

	sideListEffect(index)
}

function sideListEffect(curIndex){
	var allSideComp=document.querySelectorAll("#play-list #side-comp")
    
    console.log(allSideComp.length)
    for(var i=0; i<allSideComp.length; i++ ){
		if(i===curIndex){
			allSideComp[i].style.opacity=0.7
		}else{
			allSideComp[i].style.opacity=1
		}    
    }
    
}

function start_music(i) {
	audio_list[i].play();
	cal_audio_time();
	playTime.innerText=full_play_time;
	start_time();
}
function pause_music(i) {
	audio_list[i].pause();
	pause_time();
}
function stop_music(i){
	audio_list[i].pause();
	audio_list[i].currentTime=0;
	pause_time();
}

/* 이전 */
function prev_music(){
	audio_list[index].pause();
	audio_list[index].currentTime=0;
	if(index-1 < 0){
		index= (file_count-1);
	} else {
		index--;
	}
	//음악재생중,재생클릭시 변경되는 이미지로 변경
	music_playing=true
	startPauseImg.setAttribute("src","./images/pause.jpg");
	
	audio_list[index].play();
	cal_audio_time(index);
	fileName.innerText=file_path + (index+1)+".mp3";
	musicImage.setAttribute("src",cover_path+(index+1)+".jpg")
	playTime.innerText=full_play_time;
	
	//메인화면의 제목과 아티스트
	title.innerText=music_info[index].title;
	artist.innerText=music_info[index].artist;
	
	stop_time(index);//다 지우고
	start_time(index);//새로 시작

	sideListEffect(index)
}

/* 다음 */
function next_music(){
	audio_list[index].pause();
	audio_list[index].currentTime=0;
	if(index < (file_count-1)){
		index++;
	} else {
		index=0;
	}
	//음악재생중,재생클릭시 변경되는 이미지로 변경
	music_playing=true
	startPauseImg.setAttribute("src","./images/pause.jpg");
	
	audio_list[index].play();
	cal_audio_time(index);
	fileName.innerText=file_path + (index+1)+".mp3";
	musicImage.setAttribute("src",cover_path+(index+1)+".jpg")
	playTime.innerText=full_play_time;
	
	//메인화면의 제목과 아티스트
	title.innerText=music_info[index].title;
	artist.innerText=music_info[index].artist;
	
	stop_time(index);//다 지우고
	start_time(index);//새로 시작

	sideListEffect(index)
}

function cal_audio_time(){
	full_play_time=0;
	
	//alert(audio_list[index].duration);
	min = (audio_list[index].duration)/60;
	min=parseInt(min);
	
	sec = (audio_list[index].duration)%60;
	sec=parseInt(sec);

	if(min<10){
		min = "0"+min
	}
	if(sec<10){
		sec = "0"+sec
	}
	full_play_time=min+":"+sec;
}


function start_time(){
	if(ret_val==null){//null일때만 실행
		ret_val=setInterval(time_tick,1000);
	} 
}

function time_tick(){

	if(current_time_tick+1>=audio_list[index].duration){
		console.log("재생완료!");
		clearInterval(ret_val);
		ret_val=null;

		min = audio_list[index].duration/60;
		min=parseInt(min);
		
		sec = audio_list[index].duration%60;
		sec=parseInt(sec);

		if(min<10){
			min = "0"+min
		}
		if(sec<10){
			sec = "0"+sec
		}

		document.getElementById("current-time").innerText=min+":"+sec;

		return;
	}

	current_time_tick=current_time_tick+1;

	cur_min=current_time_tick/60;
	cur_min=parseInt(cur_min);
	cur_sec=current_time_tick%60;
	if(cur_min === 0){
		cur_min ="00"
	}else if(cur_min < 10){
		cur_min = "0"+cur_min
	}

	if(cur_sec < 10){
		cur_sec = "0"+cur_sec
	}
	cur_time_full=cur_min+":"+cur_sec;

	currentTime.innerText=cur_time_full;
}

function stop_time(){
	clearInterval(ret_val);
	ret_val=null;
	current_time_tick=0;
	currentTime.innerText='';
}
function pause_time(){
	clearInterval(ret_val);
	ret_val=null;
}