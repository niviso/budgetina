import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Tag } from "./Tag";
export default function ItemPicker({ items }: any) {
    const [selectedItems, setSelectedItems] = useState([]);
    return (
        <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 15 }
        }>
            {items.map((category, index) => <Tag key={`category-${index}`} title={category} onSelect={(e: string) => setSelectedItems([...selectedCategories, e])} onDeselect={(e: string) => deselect(e)} />)}
        </View>
    )
}