"use client";

import { Button } from '@/components/ui/button';
import { deleteAllSavedProperties } from '@/lib/actions/admin/properties.actions';
import React from 'react';

interface DeleteButtonProps {
    onDelete: () => void; // Callback to handle UI after deletion
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
    const handleDeleteAll = async () => {
        const result = await deleteAllSavedProperties();

        if (result.success) {
            onDelete(); // Trigger the callback to clear the properties on the parent component
        } else {
            console.error(result.error); // Handle error
        }
    };

    return (
        <Button onClick={handleDeleteAll}>Delete All</Button>
    );
};

export default DeleteButton;
