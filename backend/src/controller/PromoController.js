
export const validatePromo = async (req, res) => {

    try{

        let {code, totalAmount} = req.body;

    

        const promoCodes = {
            "SAVE10" :{
                type : "percent",
                value : 10,
            },
            "FLAT100" : {
                type : "flat",
                value : 100,
            }
        };

        const promo = promoCodes[code];

        if(!promo){
            return res.status(404).json({message : 'Invalid promo code'});
        }

        let discount = 0;

        if(promo.type === 'percent'){
            discount = (promo.value / 100) * totalAmount;
        }

        if(promo.type === 'flat'){
            discount = promo.value;
        }
        
        const finalAmount = Math.max(0, totalAmount - discount);

        res.status(200).json({
            valid : true,
            discount,
            finalAmount,
            code,
            message : 'Promo code applied successfully'
        });
    }catch(error){
        res.status(500).json({message : 'Server Error'});
    }
}