
function init_side_list(img_src,artist,title,time){
    //전체틀
    var sideComp=document.createElement('div')
    sideComp.setAttribute("id","side-comp")

    //이미지 넣을 프로필
    var profileSpan=document.createElement('span')
    profileSpan.setAttribute("id","profile")
    
    //이미지 설정
    var coverImage=document.createElement('img')
    coverImage.setAttribute("src",img_src)
    coverImage.setAttribute("width","100%")
    coverImage.setAttribute("height","100%")
    coverImage.setAttribute("id",title)

    profileSpan.appendChild(coverImage)
    //오른쪽 정보
    var infoSpan=document.createElement('span')
    infoSpan.setAttribute("id","info")
    
    var infoUp=document.createElement('span')
    infoUp.setAttribute("id","info-up")
    var infoUpText=document.createTextNode(artist)
    infoUp.appendChild(infoUpText)

    var infoBottom=document.createElement('span')
    infoBottom.setAttribute("id","info-bottom")
    var infoBottomText=document.createTextNode(title)
    infoBottom.appendChild(infoBottomText)

    infoSpan.appendChild(infoUp)
    infoSpan.appendChild(infoBottom)

    var timeSpan=document.createElement('span')
    timeSpan.setAttribute("id","time")

    sideComp.appendChild(profileSpan)
    sideComp.appendChild(infoSpan)
    sideComp.appendChild(timeSpan)

    var playList=document.getElementById("play-list")
    playList.appendChild(sideComp)
}

function sideListClickEventEnroll(){
    var sideComp=document.querySelectorAll("#play-list #side-comp img")
    
    for(var i=0; i<sideComp.length; i++){
        sideComp[i].addEventListener('click',sideListClick)
    }
}

function sideListClick(e){
    //alert('sideListClick!')
    console.log(e.target)
    var targetElement=e.target
    console.log(targetElement.id)
    const title=targetElement.id
    
    var allSideComp=document.querySelectorAll("#play-list #side-comp")
    
    console.log(allSideComp.length)
    for(var i=0; i<allSideComp.length; i++ ){
        allSideComp[i].style.opacity=1
    }
    
    const parentDiv = targetElement.parentElement.parentElement
    parentDiv.style.opacity=0.7

    console.log(parentDiv)
    playSelectedMusic(title)
}

function playSelectedMusic(title){
    for(var i=0; i<music_info.length; i++){
        if( title === music_info[i].title){
            //alert("목록에서 검색")
            //alert(i+"번째 음악!")
            //모든 오디오 끄고
            stopAllMusic()
            stop_time()
            index=i
            cal_audio_time()
            start_music(i)
            changeMainAudioInfo(i)
            startPauseImg.setAttribute("src","./images/pause.jpg");
            music_playing=true
            return
        }
    }
}

function changeMainAudioInfo(i){
    fileName.innerText = file_path +""+(i+1)+".mp3";
	musicImage.setAttribute("src",cover_path+""+(i+1)+".jpg")
	title.innerText=music_info[i].title;
	artist.innerText=music_info[i].artist;
}

function stopAllMusic(){
    for(var i=0; i<music_info.length; i++){
        audio_list[i].pause()
        audio_list[i].currentTime=0
    }
}