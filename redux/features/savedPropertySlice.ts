import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toggleSaveProperty, isPropertySaved } from '@/lib/actions/admin/properties.actions';

interface ToggleSaveResponse {
    success: boolean;
    error?: string;
    statusCode?: number;
    data?: any;
}

export const toggleSavePropertyAsync = createAsyncThunk<
    { propertyId: string; isSaved: boolean },
    string,
    { rejectValue: string }
>(
    'savedProperties/toggleSave',
    async (propertyId, { rejectWithValue }) => {
        try {
            const response: ToggleSaveResponse = await toggleSaveProperty(propertyId);
            if (response.success) {
                return { propertyId, isSaved: !!response.data };
            } else {
                return rejectWithValue(response.error || 'Failed to toggle property save status');
            }
        } catch (error) {
            return rejectWithValue('Failed to toggle property save status');
        }
    }
);

export const checkSavedStatusAsync = createAsyncThunk<
    { propertyId: string; isSaved: boolean },
    string,
    { rejectValue: string }
>(
    'savedProperties/checkStatus',
    async (propertyId, { rejectWithValue }) => {
        try {
            const isSaved = await isPropertySaved(propertyId);
            return { propertyId, isSaved };
        } catch (error) {
            return rejectWithValue('Failed to check property save status');
        }
    }
);

interface SavedPropertiesState {
    savedProperties: { [propertyId: string]: boolean };
    loading: boolean;
    error: string | null;
}

const initialState: SavedPropertiesState = {
    savedProperties: {},
    loading: false,
    error: null,
};

const savedPropertiesSlice = createSlice({
    name: 'savedProperties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleSavePropertyAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleSavePropertyAsync.fulfilled, (state, action: PayloadAction<{ propertyId: string; isSaved: boolean }>) => {
                state.loading = false;
                state.savedProperties[action.payload.propertyId] = action.payload.isSaved;
            })
            .addCase(toggleSavePropertyAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            })
            .addCase(checkSavedStatusAsync.fulfilled, (state, action: PayloadAction<{ propertyId: string; isSaved: boolean }>) => {
                state.savedProperties[action.payload.propertyId] = action.payload.isSaved;
            });
    },
});

export default savedPropertiesSlice.reducer;