import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { search, page = 1 } = req.query;

        if (search) {
            const name = await Recipient.findAll({
                limit: 10,
                offset: (page - 1) * 10,
                order: [['id', 'DESC']],
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`,
                    },
                },
            });
            return res.json(name);
        }

        const recipient = await Recipient.findAll({
            limit: 10,
            offset: (page - 1) * 10,
            order: [['id', 'DESC']],
        });

        return res.json(recipient);
    }

    async show(req, res) {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        return res.json(recipient);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            city: Yup.string().required(),
            postcode: Yup.string().required(),
            country: Yup.string().required(),
            complement: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail' });
        }

        const recipientExists = await Recipient.findOne({
            where: { name: req.body.name },
        });

        if (recipientExists) {
            return res.status(400).json({ error: 'Recipient already exists' });
        }

        const recipient = await Recipient.create(req.body);

        return res.json(recipient);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            street: Yup.string(),
            number: Yup.string(),
            city: Yup.string(),
            postcode: Yup.string(),
            country: Yup.string(),
            complement: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fail' });
        }

        const { name } = req.body;

        const recipient = await Recipient.findByPk(req.params.id);

        if (name && name !== recipient.name) {
            const recipientExists = await Recipient.findOne({
                where: { name },
            });

            if (recipientExists) {
                return res
                    .status(400)
                    .json({ error: 'Recipients already exists' });
            }
        }

        const updatedRecipient = await recipient.update(req.body);

        return res.json(updatedRecipient);
    }

    async delete(req, res) {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);

        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        recipient.destroy();

        return res.json(recipient);
    }
}

export default new RecipientController();
