$(document).ready(function(){
    var $wizStepTabList = $('#wiz-step-tab>li');
    var $wizStepContList = $('#wiz-step-cont>li');
    var $wizBtnPrev = $('.wiz-main-btn-wrap .btn-prev-step');
    var $wizBtnNext = $('.wiz-main-btn-wrap .btn-next-step');
    var arrStep02InputVal = []; // #step-01의 입력값 배열
    
    //3자리 단위마다 콤마 생성
    function addCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //모든 콤마 제거
    function removeCommas(x) {
        if(!x || x.length == 0) return "";
        else return x.split(",").join("");
    }
    // "다음" 버튼 함수
    function nextStep(){
        $wizStepTabList.filter('.active')
            .next().addClass('active');
        $wizStepContList.filter(':visible').hide()
            .next().show();
        $('html').scrollTop(840);
    };
    
    // step 01 문항 진행
    $wizStepContList.eq(0)
        .find('input[type="radio"]').on('click',function(){
        if($(this).hasClass('correct')){
            $(this).parent().parent().addClass('active')
                .next().removeClass('none');
        }else{
            $(this).parent().parent().removeClass('active')
                .nextAll().addClass('none').removeClass('active')
                .find('input[type="radio"]').prop('checked',false);

            $('#popup-area, #popup-wiz01-incorrect').show();
            $('#popup-wiz01-incorrect>ul>li').hide()
                .eq(
                $(this).parent().parent().index()).show();
            $('#popup-area .close').focus();
        }
    });
    $('#popup-wiz01-incorrect .close').on('click',function(){
        $wizStepContList.eq(0)
        .find('input[type="radio"]:checked').focus();
    });
    
    // step 02 문항 진행
    $wizStepContList.eq(1)
        .find('input[type="radio"]').on('click',function(){
        filteringCheckList();
    });
    filteringCheckList();
    
    function filteringCheckList(){
        var $tr = $wizStepContList.eq(1).find('tr');
        if(
            $tr.eq(2).find('input[type="radio"]')
            .filter(':checked').val() == 2
        ){
            $wizStepContList.eq(1)
                .find('input[type="radio"]').attr('disabled',false);
            $wizStepContList.eq(1).find('table tr:nth-child(4)')
                .find('input[type="radio"]').attr('disabled',true).prop("checked", false);
        }else{
            $wizStepContList.eq(1).find('input[type="radio"]').attr('disabled',false);
        }
    }
    
    $('.input-commas').on('keypress change',function(){
        $(this).val(addCommas($(this).val().replace(/[^0-9]/g,"")));
    });
    
    // step01 "다음" 버튼 클릭
    $wizStepContList.eq(0).find($wizBtnNext).on('click', function(){
        if($('#wiz-step-cont .step-01 li.active').length == $('#wiz-step-cont .step-01 li').length){
            nextStep();
        }else{
            alert('문항을 모두 맞춰야 다음 단계로 진행할 수 있습니다.');
        }
    });
    
    // step02 "다음" 버튼 클릭
    $wizStepContList.eq(1).find($wizBtnNext).on('click',function(){
        var $step02TableTr = $('#wiz-step-cont .step-02 table tr');
        var maxCost = 10000000000; // 총 사업비 상한선
        
        if($step02TableTr.eq(0).find('input').val() == ''){
            alert($step02TableTr.eq(0).find('th').text()+'(을)를 입력 해주세요');
            return false;
        }
        
        for(i=1; i<$step02TableTr.length; i++){
            if(
                $step02TableTr.eq(i).find('input:checked').val() == undefined && $step02TableTr.eq(i).find('input[type="radio"]').filter(':disabled').length == 0
            ){
                alert($step02TableTr.eq(i).find('th').text()+'(을)를 선택 해주세요.');
                return false;
            }
        }
        
         // step02 입력값 저장
        arrStep02InputVal[0] = Number(
            removeCommas($step02TableTr.eq(0).find('input').val())
        );
        for(i=1; i<$step02TableTr.length; i++){
            arrStep02InputVal[i] = Number(
                $step02TableTr.eq(i).find('input:checked').val()
            );
            if($step02TableTr.eq(i).find('input:checked').val() == undefined){
                arrStep02InputVal[i] = 0
            }
        }
        
        if(arrStep02InputVal[0] > maxCost){
            
            alert('임대상가 조성 사업의 대출금액은 ' + addCommas(maxCost) + '원을 초과할 수 없습니다.');
            return false;
        }
        
        nextStep();
        
        //** step03 결과 출력 변수 **//
        var $wizStep03Table01 = $wizStepContList.eq(2).find('.table-01 tr');
        var $wizStep03Table02 = $wizStepContList.eq(2).find('.table-02 tr');
        var arrStep03Table01Item03 = ['해당없음', '공적 임대주택 포함', '공적 임대주택 미포함'];
        var arrStep03Table01Item04 = ['해당없음', '총 연면적의 20% 이상', '총 연면적의 20% 미만'];
        var arrStep03Table02Item01 = ['streethouse_intro.html','autohouse_intro.html'];
        var arrStep03Table02Item02 = ['총 사업비의 70% (공적임대 20% 이상)', '총 사업비의 50% (공적임대 20% 미만)'];
        
        var incentive; //한도우대
        
        // 한도우대 함수
        function getIncentive(){
            if(arrStep02InputVal[2] == 2){
                incentive = 50;
            }else if(arrStep02InputVal[2] == 1){
                if(arrStep02InputVal[3] == 1){
                    incentive = 70;
                }else if(arrStep02InputVal[3] == 2){
                    incentive = 50;
                }
            }
        }
        getIncentive();
        
        // 대출금액
        var loanAmount = 
            Math.floor(arrStep02InputVal[0] * (incentive/100));
        
        //정보입력사항 출력
        $wizStep03Table01.eq(0)
            .find('.val').text(addCommas(arrStep02InputVal[0]));
        $wizStep03Table01.eq(1)
            .find('.val').text(
            $step02TableTr.eq(1).find('input:checked + label').text());
        $wizStep03Table01.eq(2)
            .find('.val').text(
            arrStep03Table01Item03[arrStep02InputVal[2]]);
        
        //예상대출금액 산출결과 출력
        $wizStep03Table02.eq(0)
            .find('.val').text(
            $step02TableTr.eq(1).find('input:checked + label').text());
        $wizStep03Table02.eq(0)
            .find('a').attr('href',
            arrStep03Table02Item01[arrStep02InputVal[1] - 1]);
        $wizStep03Table02.eq(1)
            .find('.val').text(addCommas(loanAmount));
    });
    
    // "이전" 버튼 클릭
    for(i=1; i<$wizStepTabList.length; i++){
        $wizStepContList.eq(i).find($wizBtnPrev).on('click', function(){
            $wizStepTabList.filter('.active')
                .last().removeClass('active');
            $wizStepContList.filter(':visible').last().hide()
                .prev().show().find($wizBtnNext).focus();;
            $('html').scrollTop(840);
        });
    }
    // "다시하기" 버튼 클릭
    $wizStepContList.eq(2).find($wizBtnNext).on('click', function(){
        location.reload();
        $('html').scrollTop(840);
    });
    
    // 도움말 클릭
    $('.btn-help').on('click', function(e){
        var $thisHelpArea = 
            $('.help-area').filter(
                '[data-help='+ $(this).data('help') +']'
            );
        
        e.preventDefault();
        $thisHelpArea.toggle().css({
            left: $(this).offset().left,
            top: $(this).offset().top + $(this).height()
        });
        
        if($(this).offset().left > ($(window).width()/2)){
            $thisHelpArea.css({
                left: ($(this).offset().left + $(this).width()) - $thisHelpArea.width(),
                top: $(this).offset().top + $(this).height()
            });
        }
    });
});