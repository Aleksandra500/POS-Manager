"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const db_1 = __importDefault(require("../db"));
const getAllProducts = async (req, res) => {
    try {
        // Koristimo await, nema callback funkcije
        const [results] = await db_1.default.query('SELECT * FROM products');
        // results je niz objekata sa podacima iz baze
        return res.status(200).json({ results });
    }
    catch (err) {
        console.error('Greška pri preuzimanju proizvoda:', err);
        return res.status(500).json({ message: 'Greška na serveru' });
    }
};
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=productsControllers.js.map