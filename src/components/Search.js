import React, { useEffect, useState } from 'react';
import { TextField, Stack, Autocomplete } from '@mui/material';
import GlobalApi from '../app/GlobalApi';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchInput, setSearchInput] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false); // Thêm trạng thái open
    const navigate = useNavigate();

    useEffect(() => {
        getSearch();
    }, []);

    const getSearch = async () => {
        try {
            const response = await GlobalApi.getAllMovies(); 
            console.log("search", response.data);
            setSearchInput(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelect = (event, value) => {
        if (value) {
            const selectedMovie = searchInput.find(movie => movie.title === value);
            if (selectedMovie) {
                navigate(`/detail/${selectedMovie.id}`); // Điều hướng đến trang chi tiết phim
            }
        }
    };

    const handleInputChange = (event, value) => {
        setInputValue(value);
        setOpen(value.length > 0); // Mở thanh autocomplete khi có giá trị tìm kiếm
    };

    return (
        <Stack 
            spacing={2} 
            sx={{ 
                width: '100%',
                maxWidth: 300,
                margin: '10px auto',
            }}
        >
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={searchInput.map((option) => option.title)}
                onChange={handleSelect}
                open={open} // Thêm thuộc tính open để kiểm soát việc hiển thị
                onInputChange={handleInputChange} // Xử lý thay đổi input
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search input"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                height: '48px',
                                backgroundColor: 'transparent', 
                                '& fieldset': {
                                    borderColor: '#173B60',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#173B60',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#173B60',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#173B60', 
                                top: '-5px',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -6px) scale(0.75)',
                            },
                            '& .MuiInputBase-input': {
                                color: '#173B60', 
                                fontWeight:"bold",
                                padding: '0 14px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                '&::placeholder': {
                                    color: '#173B60', 
                                    opacity: 1,
                                },
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default Search;
