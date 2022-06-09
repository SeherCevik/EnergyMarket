
//interface de işlemler için bunlar kullanılacak bu interface i kullanıdığımız bütün nesneler için bu interface in için de tanımladığımız değerler geçerli olmalıdır.

export interface IOfferInfo {
    price: number,
    quantity: number
}

export interface IDepthHistory {
    contract: string,
    deliveryStart: string,
    deliveryEnd: string,
    tradeOpen: string,
    tradeClose: string,
    dateTime: string,

    buy: IOfferInfo[],
    sell: IOfferInfo[]
}