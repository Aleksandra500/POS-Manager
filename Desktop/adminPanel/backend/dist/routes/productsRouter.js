"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const productsControllers_1 = require("../controllers/productsControllers");
router.get('/', (req, res) => (0, productsControllers_1.getAllProducts)(req, res));
exports.default = router;
//# sourceMappingURL=productsRouter.js.map