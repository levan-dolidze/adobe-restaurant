export interface FixedFee {
    type: 'fixedFee',
    fixed: number;

}

export interface VariableFee {
    type: 'variableFee',
    multiplier: number;
}

type PaymentFee = FixedFee | VariableFee


export function countFee(fee: PaymentFee, itemPrice: any): any {
    switch (fee.type) {
        case 'fixedFee':
            return itemPrice + fee.fixed
            break;

        case 'variableFee':
            return (itemPrice / 100 * fee.multiplier) + itemPrice
            break;

        default:
            break;
    }

}

