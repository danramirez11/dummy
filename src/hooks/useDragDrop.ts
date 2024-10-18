import { useState } from "react";

interface ItemType {
    item: string;
    quantity: number;
}

const useDragDrop = () => {
    const [items, setItems] = useState<ItemType[]>([]);

    const handleDrag = (e: React.DragEvent, item: string) => {
        e.dataTransfer.setData('text', item);
    }

    const handleDrop = (e: React.DragEvent) => {
        const item = e.dataTransfer.getData('text');
        setItems(prevItems => {
            const existingItem = prevItems.find(i => i.item === item);
            if (existingItem) {
            return prevItems.map(i =>
                i.item === item ? { ...i, quantity: i.quantity + 1 } : i
            );
            } else {
            return [...prevItems, { item, quantity: 1 }];
            }
        });
    }

    const handleDropDelete = (e: React.DragEvent) => {
        const item = e.dataTransfer.getData('text');
        setItems(prevItems => {
            return prevItems
                .map(i => i.item === item ? { ...i, quantity: i.quantity - 1 } : i)
                .filter(i => i.quantity > 0);
        });
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    return {
        items,
        handleDrag,
        handleDrop,
        handleDragOver,
        handleDropDelete
    }
 }

export default useDragDrop;