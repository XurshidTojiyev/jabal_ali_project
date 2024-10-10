var hammasi_text ="";
$(document).ready(function() {
    $.ajax({
        url: "https://pink-theodora-56.tiiny.io/backend/api/api.php?action=display",
        type: "GET",
        success: function(data) {
            var output = "";
            $.each(data, (index, element) => {

                output += `
                <div data-id="${element['id']}" id='${element['description']}' class="card">
                    <img class='img' src="./images/${element['img']}" alt="">
                    <span>${element['title']}</span>
                    <div class="ctr-price">
                        <p>${element['price']}.000 UZS</p>
                        <div class="cntr">
                            <button class="decr">-</button>
                            <p>0</p>
                            <button class="incr">+</button>
                        </div>
                    </div>
                </div>
                `
            })
            hammasi_text = output;
            $(".cards").html(output);
        }
    })
})


$(".btn-all").click(function() {
    $.ajax({
        url: "https://pink-theodora-56.tiiny.io/backend/api/api.php?action=display",
        type: "GET",
        success: function(data) {
            var output = "";
            $.each(data, (index, element) => {

                output += `
                <div class="card" cata-id="${element['id']} id='${element['description']}'">
                    <img class='img' src="./images/${element['img']}" alt="">
                    <span>${element['title']}</span>
                    <div class="ctr-price">
                        <p>${element['price']}.000 UZS</p>
                        <div class="cntr">
                            <button class="decr">-</button>
                            <p>0</p>
                            <button class="incr">+</button>
                        </div>
                    </div>
                </div>
                `
            })
            $(".cards").html(output);
        }
    })
})

$(".btn_1").click(() => {
    $.ajax({
        url: "https://pink-theodora-56.tiiny.io/backend/api/api.php?action=sort&category=ichimlik",
        type: "GET",
        success: function(data) {
            var output = "";
            $.each(data, (index, element) => {
                output += `
                <div data-id=" ${element['id']}" id='${element['description']}' class="card">
                    <img class='img' src="./images/${element['img']}" alt="">
                    <span>${element['title']}</span>
                    <div class="ctr-price">
                        <p>${element['price']}.000 UZS</p>
                        <div class="cntr">
                            <button class="decr">-</button>
                            <p>0</p>
                            <button class="incr">+</button>
                        </div>
                    </div>
                </div>
                `
            })
            $(".cards").html(output);
        }
    })
}) 

document.onclick = (e) => {
    for(var i = 0;i < e.target.classList.length;i++) {
        if(e.target.classList[i] == 'incr') {
            var prntlmnt = e.target.parentElement.parentElement.parentElement;
            var id = prntlmnt.getAttribute('data-id');
            var PNextSibling = e.target.previousElementSibling.innerHTML;
            PNextSibling = parseInt(PNextSibling);
            PNextSibling = PNextSibling + 1;
            paragraphTag = e.target.previousElementSibling.innerHTML = `${PNextSibling}`
            break;
        }
    }
}
    $(document.body).click(function(e) {
    for(var i = 0;i < e.target.classList.length;i++) {
        if(e.target.classList[i] == 'decr') {
            var PNextSibling = e.target.nextElementSibling.innerHTML;
            PNextSibling = parseInt(PNextSibling);
            if(PNextSibling > 0) {
                PNextSibling = PNextSibling - 1;
                paragraphTag = e.target.nextElementSibling.innerHTML = `${PNextSibling}`
            }
            break;
        }
    }
})

$(".buyurtma_btn__btn").click(() => {
        // var jami = datas[0].count + datas[1].count + datas[2].count;
        var cards = document.querySelectorAll(".card");
        var message = "";
        cards.forEach(element => {
            var buyurtma = element.children[2].children[1].children[1].innerHTML;
            buyurtma = parseInt(buyurtma);
            
            if(buyurtma != 0) { 
                var productName = element.children[1].innerHTML;
                var text = `${productName}: ${buyurtma}ta `
                message+=text;
            }             
        })

        if(message != ""){
            $.ajax({
                type: 'GET',
                url: `https://api.telegram.org/bot6974811678:AAGXRktffIrpej7gpm3nUmj7LwZ8MlBCRF8/sendMessage?chat_id=5955353365&text=${message}&parse_mode=Markdown`, 
                success: function(res) {                
                    alert("Buyurtma yetkazildi yaqin orada siz bilan bog'lanamiz!!");
                 },
    
                 error: function(res) {
                    console.log("serverda xatolik yuzberdi.. keyinroq uruning ko'ring!");
                    
                 }
              });
        } else {
            alert("Iltimos birinchi mahsulot tanlang!")
        }        
        
})

$(document.body).click((e) => {
    
    if(e.target.classList[0] == 'img') {
        var target = e.target;
        if(target.getAttribute('src')) {
            $('.popup_img').attr('src', target.getAttribute('src'));
        }
        var description = target.parentElement.getAttribute('id');
        console.log(description);
        
        $('.about_product').html(description);
        $('.popup_span').html(e.target.nextElementSibling);
        $('.d-none').css('display', 'block');
        $('.cards').css('display', 'none');
        var chldrn = target.nextElementSibling.children[0];
        
        
        $('.popup_price').html(chldrn)
        // $('.popup').css('display', 'block');
        // $('.popup').css('opacity')
        $('.popup').css('margin-top', `250px`);
        $('.popup').css('margin-left', '30px');;
    }
})

$('#exit').click(() => {
    window.location.reload()
})