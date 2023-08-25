
$('input.qty').attr('value','1');

$('.butn_notify:contains(Remove In-Stock Alert)').text('Remove Alert');
$('.butn_notify').click(function(){
    $('.butn_notify:contains(Remove In-Stock Alert)').text('Remove Alert');
});

$('#addwaitlistlogin[data-link]').each(function(){
    let btn = $(this);
    btn.wrap(`
        <a href="${btn.attr('data-link')+'#waitlistlogin'}"><a>
    `);
});

window.addEventListener('searchspring.providentmetals.domReady', function(event) {
    setTimeout(function () {
        $('input.qty').attr('value','1');
        $('.butn_notify:contains(Remove In-Stock Alert)').text('Remove Alert');
        $('.butn_notify').click(function(){
            $('.butn_notify:contains(Remove In-Stock Alert)').text('Remove Alert');
        });
        $('#addwaitlistlogin[data-link]').each(function(){
            let btn = $(this);
            btn.wrap(`
                <a href="${btn.attr('data-link')+'#waitlistlogin'}"><a>
            `);
        });
    }, 3000);
});