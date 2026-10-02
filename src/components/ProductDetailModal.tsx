import React from 'react';
import { X, ExternalLink, Shirt, Store, Check, Truck } from 'lucide-react';
import { OutfitItem } from '../types';

interface ProductDetailModalProps {
  product: OutfitItem | null;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectTab
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-amber-900/40 rounded-2xl max-w-2xl w-full p-6 space-y-6 relative shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="aspect-[3/4] bg-stone-950 rounded-xl overflow-hidden border border-stone-800">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Details */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest bg-amber-950 border border-amber-800/60 px-2 py-0.5 rounded">
                  {product.brand}
                </span>
                <span className="text-[10px] font-mono text-stone-400 uppercase">{product.color}</span>
              </div>
              <h3 className="font-serif text-stone-100 text-2xl">{product.name}</h3>
              <p className="font-serif text-amber-300 text-xl font-semibold">${product.price}</p>
              <p className="text-xs text-stone-400 leading-relaxed pt-1">{product.description}</p>
            </div>

            {/* Verified Stockists Section */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <span className="text-xs font-mono text-stone-300 uppercase block">Verified Luxury Stockists</span>
              <div className="space-y-2">
                {(product.stockists || [
                  { name: 'Ssense', price: product.price, stockStatus: 'In Stock (2 left)', deliveryDays: '2 Days' },
                  { name: 'MatchesFashion', price: product.price + 30, stockStatus: 'Low Stock', deliveryDays: '3-5 Days' }
                ]).map((stk, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs"
                  >
                    <div>
                      <span className="font-serif text-stone-200 font-medium block">{stk.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{stk.stockStatus}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-amber-300 block">${stk.price}</span>
                      <span className="text-[10px] text-stone-400 flex items-center justify-end">
                        <Truck className="w-3 h-3 mr-1 text-stone-500" />
                        {stk.deliveryDays}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onSelectTab('tryon');
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-medium text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 font-sans"
              >
                <Shirt className="w-4 h-4" />
                <span>View on 3D Digital Avatar</span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectTab('marketplace');
                }}
                className="w-full bg-stone-950 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 font-sans"
              >
                <Store className="w-4 h-4 text-amber-400" />
                <span>Request Custom Tailoring from Atelier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
