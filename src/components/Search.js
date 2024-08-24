import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import GlobalApi from '../app/GlobalApi';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [searchInput , setSearchInput] = useState('');
    const [ querySearch , setQuerySearch] = useState('')
    
    const navigate = useNavigate();

    useEffect(() => {
        if(querySearch){
            getSearch()
        }
    }, [querySearch]);

    const getSearch = async () => {
        try {
            const response = await GlobalApi.getSearchMovies(querySearch); 
            console.log("search", response.data);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = () => {
        setQuerySearch(searchInput)
        navigate(`/search-flim/${searchInput}`)
    }
    

    return (
        <Stack 
            direction="row"
            spacing={2} 
            sx={{ 
                width: '100%',
                maxWidth: 300,
                margin: '10px auto',
            }}
        >
                    <TextField
                        label="Search Flim Name"
                        InputProps={{
                            type: 'search',               
                        }}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                height: '48px',
                                backgroundColor: 'transparent', 
                                '& fieldset': {
                                    borderColor: '#1E2456',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1E2456',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1E2456',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#19CBBB', 
                                top:"-5px"
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -6px) scale(0.75)',
                            },
                            '& .MuiInputBase-input': {
                                color: '#19CBBB', 
                                fontWeight:"bold",
                                padding: '0 14px',
                                height: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                '&::placeholder': {
                                    color: '#fff', 
                                    opacity: 1,
                                },
                            },
                        }}
                        
                    />
                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{
                            backgroundColor: '#1E2456',
                            color: '#fff',
                            borderRadius: '20px',
                            height: '48px',
                            '&:hover': {
                                backgroundColor: '#1E2456',
                            }
                        }}
                        
                    >
                    <SearchIcon />
                    </Button>     
        </Stack>
    );
};

export default Search;
