import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY, UTC_OFFSET_PER_COUNTRIES } from "../utils/constants";

import {Button, Fade, Grow} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";

import ScopeEarth from "../icons/ScopeEarth";
import EarthEmojiSvg from "../twemoji/react/1F30E";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);
import StarEmojiSvg from "../twemoji/react/2B50";
const STAREMOJI = get_svg_in_b64(<StarEmojiSvg />);
import CrownEmojiSvg from "../twemoji/react/1F451";
const CROWNEMOJI = get_svg_in_b64(<CrownEmojiSvg />);
import LightingEmojiSvg from "../twemoji/react/26A1";
const LIGHTINGEMOJI = get_svg_in_b64(<LightingEmojiSvg />);
import LuckEmojiSvg from "../twemoji/react/2618";
const LUCKTWEMOJI = get_svg_in_b64(<LuckEmojiSvg />);
import DNAEmojiSvg from "../twemoji/react/1F9Ec";
const DNAEMOJI = get_svg_in_b64(<DNAEmojiSvg />);
import LabopsEmojiSvg from "../twemoji/react/1F9Eb";
const LABOPSEMOJI = get_svg_in_b64(<LabopsEmojiSvg />);
import GlassesEmojiSvg from "../twemoji/react/1F97D";
const GLASSESEMOJI = get_svg_in_b64(<GlassesEmojiSvg />);
import JacketEmojiSvg from "../twemoji/react/1F97C";
const JACKETEMOJI = get_svg_in_b64(<JacketEmojiSvg />);
import DangerEmoji from "../twemoji/react/26A0";
const DANGEREMOJI = get_svg_in_b64(<DangerEmoji />);
import CEmojiSvg from "../twemoji/react/1F4681F3Fc200D1F52C";
const CEMOJI = get_svg_in_b64(<CEmojiSvg />);
import LabEmojiSvg from "../twemoji/react/1F9Ea";

const SUBTITLE_STILL = Boolean(Date.now() % 14 >= 1);
let THEME_DAY = null;
let IS_EVENING = null;
let IS_LATE_EVENING = null;

const styles = theme => ({
    root: {
        contain: "size style paint layout",
        backgroundSize: "cover",
        imageRendering: "optimizespeed",
        "&:not(br)": {
            imageRendering: "optimizespeed",
        },
        height: "100%",
        overflow: "hidden",
        position: "relative",
        "&::after": {
            content: `""`,
            position: "absolute",
            width: "100%;",
            height: "100%",
            right: 0,
            bottom: 0,
            zIndex: 1,
        }
    },
    insideRoot: {
        position: "absolute",
        width: "100%;",
        height: "100%",
        right: 0,
        bottom: 0
    },
    homeCTAuseit: {
        color: "#6f440d",
        backgroundImage: "linear-gradient(-32deg, goldenrod, #fff9f0, gold, darkgoldenrod, #fff8aa, goldenrod, blanchedalmond)",
        fontWeight: "bold",
        minWidth: "min(320px, calc(100% - 32px))",
        transform: "translateY(0px) scale(1)  !important",
        fontSize: "1.314rem",
        marginTop: "48x",
        borderRadius: "8px",
        "& svg": {
            filter: "sepia(1)"
        },
        "&:hover": {
            color: "#402303",
            filter: "drop-shadow(0px 0px 16px goldenrod) brightness(1.1)",
            transform: "translateY(-3.4px) scale(1.1)  !important",
        },
        zIndex: 7,
        filter: "drop-shadow(0px 0px 4px darkgoldenrod)",
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 175ms !important",
        [theme.breakpoints.down("sm")]: {
            minWidth: "auto",
            position: "fixed",
            fontSize: "1rem",
            bottom: 72,
        },
    },
    homeCTAsendit: {
        color: "#ffffff",
        transform: "translateY(0px) scale(1)  !important",
        textShadow: "0px 0px 4px white",
        filter: "drop-shadow(0px 0px 4px skyblue) brightness(1)",
        "&:hover": {
            color: "#ffffff",
            filter: "drop-shadow(0px 0px 16px lightskyblue) brightness(1.1)",
            transform: "translateY(-7px) scale(1.2)  !important",
        },
        backgroundImage: "linear-gradient(32deg, #6100fd, #5dbff3, #7be2f1, #98ecff, #32c4ff, #6d5bff, #020562)",
        transformOrigin: "center",
        transition: "color, filter, transform cubic-bezier(0.4, 0, 0.2, 1) 175ms !important",
        fontWeight: "bold",
        fontSize: "21px",
        borderRadius: "12px",
        lineHeight: "2em",
        position: "fixed",
        maxWidth: 274,
        zIndex: 7,
        bottom: 32,
        right: 32,
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
            borderRadius: ".5em",
            lineHeight: "1.75em",
            maxWidth: 188,
            bottom: 24,
            right: 24,
        },
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        "&:after": {
            content: "''",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            position: "absolute",
            backdropFilter: "brightness(0.777) saturate(0.9) contrast(1.2) brightness(1.5)",
        },
        position: "relative",
        backgroundPosition: "0% 25vh",
        animation: "$slide 56s linear infinite",
        "@global": {
            "@keyframes slide": {
                "0%": {backgroundPosition: "-150% 25vh"},
                "20%": {backgroundPosition: "-50% 25vh"},
                "40%": {backgroundPosition: "50% 25vh"},
                "60%": {backgroundPosition: "150% 25vh"},
                "80%": {backgroundPosition: "225% 25vh"},
                "100%": {backgroundPosition: "300% 25vh"},
            }
        },
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        right: "max(25vw, 25vh)",
        bottom: "max(25vw, 25vh)",
        width: "min(47.5vw, 47.5vh)",
        filter: "drop-shadow(0px 0px 12px white)",
        zIndex: 3,
        position: "fixed",
        transform: "translate(min(50vh, 50%), min(50vh, 50%))",
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        margin: "0px 48px",
        height: "100%",
        "& blockquote": {
            fontSize: "14px",
            display: "none",
        },
        [theme.breakpoints.down("sm")]: {
            margin: "8px 24px",
            "& blockquote": {
                fontSize: "10px",
            }
        },
        zIndex: 5,
    },
    titleh1: {
        whiteSpace: "break-spaces",
        maxWidth: "1000px",
        fontWeight: "normal",
        fontSize: "32px",
        filter: "saturate(2.25)",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "24px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
            "& sup": {
                fontSize: "0.5em",
                opacity: "0.77",
                fontWeight: "bold",
            },
        },
    },
    titleh2: {
        whiteSpace: "break-spaces",
        fontWeight: "normal",
        fontSize: "21px",
        maxWidth: "600px",
        filter: "saturate(2.25)",
        "& sup": {
            fontSize: "0.33em",
            opacity: "0.66",
            fontWeight: "bold",
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "16px",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
            "& sup": {
                fontSize: "0.66em",
                opacity: "1",
                fontWeight: "bold",
            },
        },
    },
    titleSubTitle: {
        position: "fixed",
        bottom: 28,
        color: "white",
    },
    subtitle: {
        "&, & > span": {
            color: "inherit",
            filter: "drop-shadow(rgba(0, 0, 0, .14) 0px 0px 7px) drop-shadow(rgba(0, 0, 0, .7) 0px 0px 14px) contrast(1.25)",
            opacity: "1",
            fontSize: 14,
            lineHeight: "1.75em",
            marginBottom: "56px",
            "& .emoji": {
                width: "2em",
                transform: "scale(1.25)"
            },
            fontWeight: "normal",
            [theme.breakpoints.down("sm")]: {
                fontSize: 12,
                display: "none",
                lineHeight: "1.75em",
            },
        }
    },
    subtitleButton: {
        color: "#44cb16",
        fontWeight: "bold",
        fontSize: "10px",
        filter: "drop-shadow(0px 0px 2px #4caf5033) sepia(1)",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        fontWeight: 600,
    },
    stepPoints: {
        color: "#fad101",
        textShadow: "0px 0px 3px darkgoldenrod, 0px 0px 6px darkgoldenrod, 0px 0px 12px black",
        filter: "hue-rotate(75deg)",
        display: "inline-block",
        transformOrigin: "left",
        transform: "scale(2.1)",
        fontWeight: "bold",
        marginLeft: "-24px",
        marginRight: "48px"
    },
    revelantText: {
        color: "#eeb319",
        textShadow: "0px 0px 2px #ffb500, 0px 0px 4px #bd8909, 0px 0px 8px #6b4000, 0px 0px 12px #000000",
        filter: "sepia(1) hue-rotate(180deg) saturate(2) contrast(1.5)",
    }
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            lc: props.lc,
            _history: HISTORY,
            _image_name_infographics: null,
        };
    };

    componentDidMount() {

        function get_now_hours24_with_locale(lc) {

            const offset = UTC_OFFSET_PER_COUNTRIES[lc];
            const d = new Date(Date.now());
            const utc = d.getTime() - (d.getTimezoneOffset() * 60 * 1000);
            const d2 = new Date(utc + (60 * 60 * 1000 * offset));

            return d2.getHours();
        }

        function is_day(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 22 && h > 6);
        }

        function is_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 22 && h > 21);
        }

        function is_late_evening(lc) {

            const h = get_now_hours24_with_locale(lc);
            return Boolean(h < 23 && h > 22);
        }

        THEME_DAY = is_day(this.state.lc);
        IS_EVENING = is_evening(this.state.lc);
        IS_LATE_EVENING = is_late_evening(this.state.lc);

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
            actions.trigger_snackbar(`I am Jamy, a kind Emoji, developed on IntelliJ, life in vectors, sometimes not working on tor, I can show you hints as long as you (on the web-app) let me in!`, 10000);
            setTimeout(() => {

                actions.jamy_update("happy", 2500);

                setTimeout(() => {

                    actions.trigger_snackbar(`You can click my face, I am perfect like an Ace, in imagination only is defaults about my perfections...`, 7000);
                    setTimeout(() => {

                        actions.jamy_update("suspicious", 2500);


                    }, 777);


                }, 10000);

            }, 1100);


        }, 250);

        const all_image_name_infographics = ["HandMedal", "BrainGrenada", "Lucky", "Lips", "Pharaon", "NoBombs"];

        let _image_index = 0;
        let _image_name_infographics = all_image_name_infographics[_image_index];
        let _image_auto_interval = setInterval(() => {

            _image_index++;
            _image_name_infographics = all_image_name_infographics[_image_index % parseInt(all_image_name_infographics.length - 1)];
            this.setState({_image_name_infographics});

        }, 777 * 10)

        this.setState({_image_auto_interval});
    }

    componentWillUnmount() {

        actions.stop_sound();
        clearInterval(this.state._image_auto_interval);
    }

    _go_to_editor = () => {

        window.dispatchEvent(new Event("home-action-tryeditor"));
        const { _history } = this.state;
        _history.push("/pixel");
    };

    _handle_speed_dial_action = (event, action) => {

        if(action === "share") {

            window.dispatchEvent(new Event("home-action-tryshare"));
            actions.trigger_share();
        }
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    render() {

        const { classes, _quote, _image_name_infographics } = this.state;

        return (
            <div className={classes.root} style={{
                filter: "revert",
                backgroundImage: THEME_DAY ?
                                    "url(/src/images/illustrations/Egypt-day.svg)" :
                                    "url(/src/images/illustrations/China-night.svg)",
            }}>
                <div className={classes.insideRoot}>
                    <div className={classes.backgroundImage} style={{
                        backgroundSize: THEME_DAY ? "175%": "50%",
                        backgroundColor: THEME_DAY ? IS_EVENING ? "#48004900": "#4c4c2600": "#21214200",
                        }}>
                        <Fade in={true} key={_image_name_infographics} timeout={500}><img alt="Image demo." src={`/src/images/infographics/${(_image_name_infographics || (THEME_DAY && !IS_EVENING ? "Pharaon": "Lucky").toString())}.svg`} className={classes.backgroundImageImage}/></Fade>
                    </div>
                </div>
                <div className={classes.headerContainer} style={{color: THEME_DAY && !IS_EVENING? "#000": "#fff"}}>
                    <h1 className={classes.titleh1} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span className={classes.stepPoints} style={{transform: "scale(1.6)"}}>1 >></span><img alt="scientist-tweemoji" src={CEMOJI} className="emoji-150"/>
                        <span className={classes.revelantText}>«PIXA.PICS» lovely pixel arts</span><span> (the picture's minima) just got ultra-light by state-shifting their colors and size.</span><br/>
                    </h1>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><b>Apply effects in laboratory? Yes or No?</b> Essential lab operations gives the <b><span className={classes.revelantText}>MAXIMA of PRIVACY</span></b> in a fashion not only looking great for the online-self...</span>
                    </h2>
                    <p>
                        <blockquote style={{fontStyle: "italic", color: THEME_DAY && !IS_EVENING ? "#222": "#ccc", marginRight: 8, marginLeft: 16}}><img alt="scientific-danger-tweemoji" style={{verticalAlign: "middle"}} src={DANGEREMOJI} className="emoji"/> MINIMA-ART being pixel art mainly takes two focused eyes to create it however beware, NFTs may be harmful if the lab ops with your files are still yours a danger to manage outside a blockchain.</blockquote>
                    </p>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><span className={classes.stepPoints}>2 >></span> <img alt="scientist-jacket-tweemoji" src={JACKETEMOJI} className="emoji-150"/> <b><span className={classes.revelantText}> WHILE EDITING</span></b> a <b >SANITIZED MINIMA-ART</b>, anyone may use <b >55+ tools in 7 panels for pixel art</b>, options in layers, filters, selections, shapes, effects,... <img alt="scientific-DNA-tweemoji" src={DNAEMOJI} className="emoji-150"/> to activate cool "NINJA" LAB-OPS!</span>
                    </h2>
                    <h2 className={classes.titleh2} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <span><span className={classes.stepPoints}>3 >></span> <img alt="scientist-jacket-tweemoji" style={{verticalAlign: "middle"}} src={GLASSESEMOJI} className="emoji-150"/> <b><span className={classes.revelantText}> RENDER UNLIMITED MINIMA-ART</span></b> in <b >4K<sup> Ultra HD</sup> images</b> or in <b >humanized ∞%<sup> Scalable</sup> shapes</b> of vectors using <img alt="laboratory-noidea-tweemoji" src={LABOPSEMOJI} style={{verticalAlign: "bottom"}} className="emoji-150"/>its DOT-MATRIX to get it majestically and visionary for you.</span>
                    </h2>
                    <h3 className={classes.subtitle} style={{color: THEME_DAY && !IS_EVENING ? "#000": "#fff"}}>
                        <img alt="space-star-tweemoji" src={STAREMOJI} className="emoji"/> <span>IMAGINE tremendous (x6 svg, x32 png) <span>PIXEL ART</span> based on your images.</span>
                        <br />
                        <img alt="nature-luck-tweemoji" src={LUCKTWEMOJI} className="emoji"/> <span>A few aspects just missing from your online-self for NFTs, CAN IT PAY OFF?</span>
                        <br />
                        <img alt="scientific-dna-tweemoji" src={DNAEMOJI} className="emoji"/> <span>Your own <span>FREELY GIVEN</span> elaborate WEB-APP makes pixel-perfect ultra-simplifications!</span>
                        <br />
                    </h3>
                    <Fade in={true} timeout={750}>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={this._go_to_editor}>
                            Join lab-ops <LabEmojiSvg style={{transform: "scale(2.5)", filter: "sepia(1) saturate(1.3) contrast(1.2) brightness(1.1) drop-shadow(0px 0px 4px darkgoldenrod)"}} className="emoji-150" /> for free!
                        </Button>
                    </Fade>
                    <Fade in={true} timeout={1000}>
                        <p className={classes.subtitleButton}><span><img alt="whole-earth-tweemoji" src={EARTHEMOJI} className="emoji"/> For Everyone <img alt="king-crown-tweemoji" src={CROWNEMOJI} className="emoji"/> For Free <img alt="sky-lightning-tweemoji" src={LIGHTINGEMOJI} className="emoji"/> Forever Open-Source...</span></p>
                    </Fade>
                    <Fade in={true} timeout={1250}>
                        <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary" onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                            SHARE NOW <ScopeEarth style={{marginLeft: -12, transform: "translate(50%, 0px) scale(3)", filter: "drop-shadow(white 0px 0px 6px)"}} className="emoji-150" />
                        </Button>
                    </Fade>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
