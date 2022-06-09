import { IOfferInfo } from "./IEnergyBoardInfo";

//offers parametresine IofferInfodaki tip ve isimdeki veriler gelir.çünkü bize ne geldiğini okuyup fonksiyonda kullanabilmek için.
//number [] fonksiyondan geriye number dizisi döneceğimizi belirttik
 export function WeightedAverage(offers : IOfferInfo[]) : number []{
        //geriye döneceğimiz diziyi result[] yazarak boş oluşturduk. Daha sonra içi dolacak
        let result = [];
        //artan ve kalan değerler için nesne oluşturduk ilk başta artan ve kalan olmadığı için değerler 0.
        let transferorRemainingQuantity = { quantity : 0, total : 0 };
        let transferorIncreasedValue= { quantity : 0, total : 0 };

        //offers ın içine gelen değerleri döngüyle dönmeye başladık.
        for(let i = 0 ; i<=offers.length; i++)                             
        {
            //offer[i] ile dizinin i. sırasında ki elemanlarını bulup daha sonra o elemanın quantity ve price değerlerini kendi tanımladığımız quantity ve price değişkenlerine atıyrouz.
            let quantity = offers[i].quantity;
            let price = offers[i].price;
            
            //burada eğer bir önce ki nesneden 2.5 e tamamlanmayan bir quantity kaldıysa bu if ile onu tespit edip if iççinde ki işlemleri yapıyoruz.
            if(transferorRemainingQuantity.quantity > 0)
            {
                //bir önce ki nesneden kalan quantity yi bulmak için devreden kalan quantity nesnemizdeki quantity değerini tanımladığımız needquantity değişkenine atıyoruz. bu değer bizim bu offers ta 2.5 a tamamlamamız için gereken değeri ifade ediyor.
                let needQuantity = transferorRemainingQuantity.quantity;


                //2.5 a tamamlamamız gereken değer quantity e eşitse yapacağımız işlem
                if(needQuantity === quantity)
                {
                    //ağırlık ortalama hesabı
                    let total = (transferorRemainingQuantity.total + (price * quantity)) / 2.5;
                    //elde ettiğimiz değeri total i resulta gönderiyoruz.
                    result.push(total);
                    //kalan değeri 2.5 a tamamlayıp result a gönderdiğimiz için artık kalan değer sıfırlanış olmalı
                    transferorRemainingQuantity = { quantity : 0, total : 0 };
                    //bu adımda başka quantity kalmadığı için bir sonraki nesneye geçiyoruz. (offers a)
                    continue;
                }
                //eğer ihtiyacımız olan quantity bu adımdaki quantity den küçükse
                else if(needQuantity < quantity)
                {
                    //küçük olduğu durum için ağırlıklı ortalama hesabı
                    let total = (transferorRemainingQuantity.total + (price * needQuantity)) / 2.5;
                    //total ı result a gönderdik
                    result.push(total);

                    transferorRemainingQuantity = { quantity : 0, total : 0 };
                    //quantity den ihtiyacımız olanı çıkarıp kalanla devam edeceğiz.
                    quantity -= needQuantity;
                }
                else
                {
                    //büyükse , ağırlık ort hesabı 
                    let total = transferorRemainingQuantity.total + (price * quantity);

                    //ihtiyacımız olan quantity i tamamlayamadığımız için bir sonraki adıma kalan quantity ve ağırlık ort toplamını aktarıyoruz.
                    transferorRemainingQuantity.total += total;
                    transferorRemainingQuantity.quantity = needQuantity - quantity;
                    //bir sonraki adıma geç
                    continue;
                }
            }
            //artan quantity var mı ihitimaline bakıyoruz
            else if(transferorIncreasedValue.quantity > 0)
            {
                //ihtiyacımız olan quantity i bulmak için artan quantity i 2.5 tan çıkarırız
                let needQuantity = 2.5 - transferorIncreasedValue.quantity;

                //eğer ihtiyacımız olanla quantity eşitse
                if(needQuantity === quantity)
                {
                    //bu ihtimal için yapılacak olan ağırlık ort hesabı
                    let total = (transferorIncreasedValue.total + (price * quantity)) / 2.5;
                    
                    result.push(total);

                    //artan quantity i sıfırlıyoruz çünkü 2.5 a tamamlamış olduk
                    transferorRemainingQuantity = { quantity : 0, total : 0 };

                    continue;
                }
                //ihtiyacımız olan quantity nin datada ki bu adımda ki quantity den küçük olma ihtimali
                else if(needQuantity < quantity)
                {
                    let total = (transferorIncreasedValue.total + (needQuantity * price)) / 2.5;

                    result.push(total);

                    transferorIncreasedValue = { quantity : 0, total : 0 };

                    //bu adımda ihtiyacımız kadarı alığ quantityden çıkarıyoruz
                    quantity -= needQuantity;
                }
                else
                {
                    //büyükse iihtimal,
                    let total = transferorIncreasedValue.total + (price * quantity);
                    //eğerbu adımda ki quantity bizim ihtiyacımızı karşılamıyorsa dir sonraki adıma devir ettik
                    transferorRemainingQuantity.total += total;
                    transferorRemainingQuantity.quantity = needQuantity - quantity;

                    continue;
                }
            }

            //kalan ve artan hesaplamalarını tamamladıktan sonra elimizde ki quantity üzerinden yapacağımız işlemler
            //quantity 2.5 a eşitse
            if(quantity === 2.5) {
                //quantity * price / 2.5 yine price a eşit olacağı için
                result.push(price);

                //kalan ve artan değeri sıfırladık
                transferorRemainingQuantity = { quantity : 0, total : 0 };
                transferorIncreasedValue = { quantity : 0, total : 0 };
            
            }
            //quantity 2.5 tan küçükse
            else if(quantity < 2.5)
            {
                //2.5 a tamamlamaya yetmediği için elimizde olan kadarının hesabını yaptık
                let total = price*quantity
                //2.5 a tamamlamak için ihtiyacımız olan quantity değerini hesapladık
                let needQuantity = 2.5 - quantity;
                //hesapladığımız değerleri bir sonraki adıma kalan olarak aktarmak için
                transferorRemainingQuantity = { quantity : needQuantity, total : total };
                
            }
            else
            {
                //elimizde ki quantity 2.5 tan büyükse bu quantity nin içinde kaç tane 2.5 olduğunu bulmak için 2.5 a bölüp aşağı yuvarlayarak tam sayı aldık
                let bolum = Math.floor(quantity / 2.5);
                //kaç tane 2.5 old bulduk bulduğumuz 2.5 kadarını for ile dönerek result a ekledik . bu adımda ki ağırlık hesabı yapılaral result a eklendi
                for(let s =0; s < bolum; s++)
                {
                    result.push(price)
                }

                let kalan = quantity % 2.5;
                //kalan varsa diye
                if (kalan > 0)
                { 
                    if(i === offers.length -1)
                    {
                        let total = price ;
                        result.push(total);
                    }
                    else
                    {
                        let total = kalan * price;
                        //
                        transferorIncreasedValue = { quantity : kalan, total : total };
                    }
                
                }
                  
            }
            
        }
        return result;
    }



// module.exports = WeightedAverage;  
