const { Router } = require('express');

class CRUD {
    constructor(model, name) {
        this.model = model;
        this.router = Router();
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);

    }

    getAll = async (req, res) => {
        try {
            const docs = await this.model.find().pagination(req);
            res.apiSuccess(docs)
        } catch (err) {
            res.status(500).apiError(err.message);
        }
    }

    getOne = async (req, res) => {
        try {
            const doc = await this.model.findById(req.params.id);
            res.apiSuccess(doc)
        } catch (err) {
            res.status(500).apiError(err.message);

        }
    }

    create = async (req, res) => {
        try {
            const doc = await this.model.create(req.body);
            res.status(201).apiSuccess(doc);
        } catch (err) {
            res.status(500).apiError(err.message);

        }
    }

    update = async (req, res) => {
        try {
            const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.status(200).apiSuccess(doc);
        } catch (err) {
            res.status(500).apiError(err.message);

        }
    }

    delete = async (req, res) => {
        try {
            await this.model.findByIdAndDelete(req.params.id);
            res.status(200).apiSuccess('Successfully deleted.');
        } catch (err) {
            res.status(500).apiError(err.message);

        }
    }
}

module.exports = CRUD;