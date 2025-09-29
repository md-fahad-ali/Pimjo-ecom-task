import mongoose from 'mongoose';

export interface ICartItem {
  productId: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  items: [CartItemSchema]
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
