import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCloudUpload, faCoins, faEarthAsia, faEllipsisVertical, faGear,  faKeyboard, faMagnifyingGlass, faSignOut, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'

import Button from '~/components/Button';
import { Wrapper as PopperWrapper} from '~/components/Popper';
import styles from './Header.module.scss'
import images  from '~/assets/images';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia}/>,
        title: 'English',
        children:{
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion}/>,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard}/>,
        title: 'Keyboard shortcuts',
    }
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    const currentUser = true;
  
    useEffect(() =>{
        setTimeout(() =>{
            setSearchResult([]);
        }, 0)
    }, []);

    // handle logic
    const handleMenuChange = (menuItem) => {
        switch(menuItem.type){
            case 'language':
                // handle language change
                break;
            default:
        }        
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser}/>,
            title: 'View profile',
            to: '/feedback'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins}/>,
            title: 'Get coins',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGear}/>,
            title: 'Setting',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut}/>,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt='Tiktok'/>

                <HeadlessTippy 
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) =>(
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Accouts
                                </h4>
                                <AccountItem/>
                                <AccountItem/>
                                <AccountItem/>
                                <AccountItem/>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder='Search accounts and videos' spellCheck={false}/>
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark}/>
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>
                    
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('actions')}>
                {currentUser ? (
                   <>
                       <Tippy content="Upload video" placement='bottom' delay={[[0, 200]]}>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faCloudUpload}/>
                            </button>
                       </Tippy>
                   </>
                ) : (

                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                            
                        </>
                )}

                <Menu
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >
                    {currentUser ? (
                        <img className={cx('user-avatar')} src="https://picsum.photos/200/300" alt='Nguyen Xuan Binh'/>
                    ) : (
                        <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </button>
                    )}
                </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;