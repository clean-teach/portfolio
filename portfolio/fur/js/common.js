$(document).ready(function(){
    // 마우스 우클릭 방지
    $(document).on("contextmenu", function(e) {
        return false;
	});
    // 반응형 이벤트, 모바일 가로 세로 변경시 새로고침
    $(window).on('resize orientationchange', function(e){
        if(e.type == 'orientationchange'){
            window.location.reload();
        }
        responsive();
    });
    responsive();
    
    // 반응형 조건에 따른 스크립트 함수
    function responsive(){
        if($(window).width() <= 1400){
            $('#main-dropdown-area').height(
                $(window).height() - $('header').height()
            );
        }else{
			// 스크롤 반응 헤더 이벤트
			$(window).on('scroll touchmove', function(e){
				if($(window).scrollTop() > 0){
					$('header').addClass('ver-02');
				}else{
					$('header').removeClass('ver-02');
				}		
			});
            $('#main-dropdown-area').height('36rem')
            $('#lnb, #main-dropdown-area').on('mouseover', function(){
                $('header').addClass('ver-02');
                $('#main-dropdown-area').show();
            }).on('mouseout', function(){
                $('header').removeClass('ver-02');
                $('#main-dropdown-area').hide();
            });
            $('#gnb a').on('keydown', function(e){
                if(e.keyCode == 9) {
                    $('header').addClass('ver-02');
                    $('#main-dropdown-area').show();
                    if($(this).parent().index() == 0 && e.shiftKey){
                        $('header').removeClass('ver-02');
                        $('#main-dropdown-area').hide();
                    }
                }
            });
            $('#main-dropdown-area .depth-01>li').on('mouseover', function(){
                $('#lnb li').eq($(this).index()).addClass('on');
            }).on('mouseout', function(){
                $('#lnb li').eq($(this).index()).removeClass('on');
            });
            // 웹 접근성 tabindex 이벤트
            $('#main-dropdown-area a').on('keydown', function(e){
                if(e.keyCode == 9) {
                    $('#lnb li').removeClass('on').eq(
                        $(this).parents().filter('.depth-01>li').index()
                    ).addClass('on');
                    if($(this).hasClass('last-focus') && e.shiftKey == false){
                        $('header').removeClass('ver-02');
                        $('#main-dropdown-area').hide();
                    }
                }
            });
        }
    }
    // 모바일 버전 드롭다운 ui
    $('#main-dropdown-area h2').on('click', function(){
        if($(window).width() <= 800){
            if($(this).hasClass('active')){
                $(this).removeClass('active')
                    .next().hide();
            }else{
                $(this).addClass('active')
                    .next().show();
            }
        }
    });
    // 테블릿 이하 버전 메뉴 열기 이벤트
    $('#main-menu-btn').on('click', function(){
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('#main-dropdown-area').hide();
            $('html').css('overflow','scroll');
        }else{
            $(this).addClass('on');
            $('#main-dropdown-area').show();
            $('html').css('overflow','hidden');
        }
    });
    // 페이지 프린트 버튼 이벤트
    $('#btn-page-print').on('click', function(){
        window.print();
    });
    // 풋터 셀렉트박스 이벤트
    $('.foot-link-select button').on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active')
                .next().hide();
        }else{
            $(this).addClass('active')
                .next().show();
        }
    })
    // 풋터 셀렉트박스 닫기 이벤트(포커스)
    $('.foot-link-select .select-option a').on('keydown', function(e){
        if(e.keyCode == 9) {
            if(e.shiftKey == false && $(this).parent().index() >= $('.foot-link-select .select-option li').length - 1){
                $('.foot-link-select button').removeClass('active')
                .next().hide();
            }else if(e.shiftKey && $(this).parent().index() == 0){
                $('.foot-link-select button').removeClass('active')
                .next().hide();
            }
        }
    });
    
    // 레이어 팝업 닫기 이벤트
    $('#popup-area .close').on('click',function(){
        $(this).parent().hide();
        $('#popup-area').hide();
    });
    // 레이어 팝업 웹 접근성 이벤트
    $('#popup-area .last-focus').on('keydown',function(e){
        if(e.keyCode == 9 && e.shiftKey == false){
            $(this).parents().filter('.popup-box').attr('tabindex',0).focus();
        }
    });
    // 로그인 팝업 열기 이벤트
    $('#gnb .btn-login').on('click',function(ev){
        ev.preventDefault();
        $('#popup-area, #popup-login').show();
        $('#popup-area .close').focus();
    });
    // 로그인 텝 클릭 이벤트
    $('#popup-login .tab button').on('click',function(){
        $('#popup-login .tab li').removeClass('active');
        $(this).parent().addClass('active');
        setCurrentTab($('#popup-login .tab li'),$('#popup-login .cont>li'));
    });
    setCurrentTab($('#popup-login .tab li'),$('#popup-login .cont>li'));
    // 활성화된 텝에 대하여 해당 내용 보이기
    function setCurrentTab(tab,cont){
        cont.hide().eq(
            tab.filter('.active').index()
        ).show();
    }
});

// 우측 마우스 클릭 금지
$(document)[0].oncontextmenu = function(){return false;}
$(document).mousedown(function(e) {
	if( e.button == 2 ) {
        alert('내용을 복사할 수 없습니다.');
        return false;
	} else {
        return true;
	}
});

// 자릿수 지정
function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
       object.value = object.value.slice(0, object.maxLength);
    }    
}
// 팝업 열기 함수
function openPopup(popupId){
    $('#popup-area,' + popupId).show();
    $(popupId).find('button').eq(0).focus();
}

// 페이지 로드 시 스크롤 설정 함수
function setStartScrollTop(){
	$('html').scrollTop($('section .tab').offset().top - $('header').height() - 20);
}



