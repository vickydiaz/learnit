import {
    GET_WORDS,
    GET_LISTS,
    SET_URL,
    SAVE_LIST,
    SAVE_WORD,
    OPEN_EDIT_LIST,
    OPEN_EDIT_WORD,
    CLEAR_EDIT,
    UPDATE_WORD,
    DELETE_WORD,
    OPEN_CREATE_WORD,
    UPDATE_LIST
} from '../actions/words';

const initialState = {
    words: [],
    lists: [],
    count: null,
    url: '/',
    editMode: false, // createWord -- editWord -- editList
    editWord: {
        spanish: '',
        english: ''
    },
    editList: {
        listTitle: ''
    },
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        /* ===================================
           Words
        ==================================== */

        case GET_WORDS:

            return {
                ...state,
                words: payload,
                count: payload.length,
                loading: false
            }

        case SAVE_WORD:

            return {
                ...state,
                words: [...state.words, {
                    correctCount: payload.data.word.correctCount,
                    dueDate: payload.data.word.dueDate,
                    english: payload.data.word.english,
                    errorCount: payload.data.word.errorCount,
                    _id: payload.data.word._id,
                    spanish: payload.data.word.spanish,
                    list: {
                        _id: payload.data.word.list,
                        title: payload.listTitle
                    }
                }]
            }

        case OPEN_CREATE_WORD:

            return {
                ...state,
                editMode: 'createWord'
            }

        case OPEN_EDIT_WORD:

            return {
                ...state,
                editMode: 'editWord',
                editWord: payload
            }

        case UPDATE_WORD:

        return {
                ...state,
                words: state.words.map(word => {
                    if (word._id === payload.data.word._id) {
                        return {
                            correctCount: payload.data.word.correctCount,
                            dueDate: payload.data.word.dueDate,
                            english: payload.data.word.english,
                            errorCount: payload.data.word.errorCount,
                            _id: payload.data.word._id,
                            spanish: payload.data.word.spanish,
                            list: {
                                _id: payload.data.word.list,
                                title: payload.listTitle
                            }
                        }
                    }
                    return word;
                })
            }

        case DELETE_WORD:

            return {
                ...state,
                words: state.words.filter(word => word._id !== payload.word._id)
            }


        /* ===================================
           Lists
        ==================================== */

        case GET_LISTS:

            return {
                ...state,
                lists: payload
            }

        case SAVE_LIST:

            return {
                ...state,
                lists: [...state.lists, payload.list]
            }

        case OPEN_EDIT_LIST:

            return {
                ...state,
                editMode: 'editList',
                editList: payload
            }

        case UPDATE_LIST:

            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list._id === payload.list._id) {
                        return payload.list;
                    }
                    return list;
                })
            }

        /* ===================================
           Other
        ==================================== */



        case CLEAR_EDIT:

            return {
                ...state,
                editMode: false,
                editWord: {
                    spanish: '',
                    english: ''
                },
                editList: {
                    listTitle: ''
                },
                createMode: false
            }


        case SET_URL:

            return {
                ...state,
                url: payload
            }

        default:
            return {
                ...state
            }


    }
}