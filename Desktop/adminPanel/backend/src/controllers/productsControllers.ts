import type { Request, Response } from 'express';
import db from '../db';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Koristimo await, nema callback funkcije
    const [results] = await db.query('SELECT * FROM products');

    // results je niz objekata sa podacima iz baze
    return res.status(200).json({ results });
  } catch (err) {
    console.error('Greška pri preuzimanju proizvoda:', err);
    return res.status(500).json({ message: 'Greška na serveru' });
  }
};
