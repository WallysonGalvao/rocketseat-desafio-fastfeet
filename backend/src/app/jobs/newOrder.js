import Mail from '../../lib/Mail';

class newOrder {
    get key() {
        return 'newOrder';
    }

    async handle({ data }) {
        await Mail.sendMail({
            to: deliverymanEmail,
            subject: 'Order registred',
            template: 'newOrder',
            context: {
                deliverymanName: data.deliverymanName,
                recipientName: data.recipientName,
                recipientStreet: data.recipientStreet,
                recipientNumber: data.recipientNumber,
                recipientCity: data.recipientCity,
                recipientPostcode: data.recipientPostcode,
                recipientCountry: data.recipientCountry,
                recipientComplement: data.recipientComplement,
            },
        });
    }
}

export default new newOrder();
