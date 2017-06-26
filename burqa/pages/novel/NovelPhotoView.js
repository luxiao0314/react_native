import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions, Button
} from 'react-native'
import {Actions} from 'react-native-router-flux';

import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import NovelDialog from "../../components/NovelDialog";
import {observable} from "../../../../node_modules/mobx/lib/mobx";
const {width, height} = Dimensions.get('window');
const PubSub = require('pubsub-js');
import {observer} from 'mobx-react/native'

var styles = {
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width,
        height,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    thumbWrap: {
        marginTop: 100,
        borderWidth: 5,
        borderColor: '#000',
        flexDirection: 'row'
    },
    thumb: {
        width: 50,
        height: 50
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
};

const renderPagination = (index, total, context) => {
    return (
        <View style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            top: 25,
            left: 0,
            right: 0
        }}>
            <View style={{
                borderRadius: 7,
                backgroundColor: 'rgba(255,255,255,.15)',
                padding: 3,
                paddingHorizontal: 7
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 14
                }}>{index + 1} / {total}</Text>
            </View>
        </View>
    )
};

const Viewer = props =>
    <Swiper index={props.index}
            style={styles.wrapper}
            renderPagination={renderPagination}>
        {
            props.imgList.map((item, i) =>
                <View key={i} style={styles.slide}>
                    <TouchableWithoutFeedback onPress={e => props.pressHandle()}>
                        <PhotoView
                            onLoad={() => console.log("onLoad called")}
                            onTap={props.onTap}
                            source={{uri: item}}
                            resizeMode='contain'
                            minimumZoomScale={0.5}
                            maximumZoomScale={3}
                            androidScaleType='center'
                            style={styles.photo}/>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    </Swiper>;


@observer
export default class NovelPhotoView extends Component {

    @observable showDialog = false;

    constructor(props) {
        super(props);
        this.state = {
            imgList: [
                'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
                'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
                'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
                'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
            ],
            showViewer: true,
            showIndex: 0
        }
        this.viewerPressHandle = this.viewerPressHandle.bind(this)
        this.thumbPressHandle = this.thumbPressHandle.bind(this)

        PubSub.subscribe("novel_dialog_visible", (msg, data) => {
            this.showDialog = data;
        });
        PubSub.subscribe("finish_photo_view", () => {
            Actions.pop();
        });
    }

    viewerPressHandle() {
        this.setState({
            showViewer: false
        })
    }

    thumbPressHandle(i) {
        this.setState({
            showIndex: i,
            showViewer: true
        })
    }

    render() {
        return (
            <View style={{position: 'relative'}}>
                {
                    this.state.showViewer &&
                    <Viewer
                        index={this.state.showIndex}
                        onTap={this._onTap}
                        pressHandle={this.viewerPressHandle}
                        imgList={this.state.imgList}/>
                }
                <View style={styles.thumbWrap}>
                    {
                        this.state.imgList.map((item, i) =>
                            <TouchableOpacity key={i} onPress={e => this.thumbPressHandle(i)}>
                                <Image style={styles.thumb} source={{uri: item}}/>
                            </TouchableOpacity>)
                    }
                </View>
                <NovelDialog
                    _onBack={() => Actions.pop()}
                    _dialogVisible={this.showDialog}/>
            </View>
        )
    }

    _onTap = () => {
        if (!this.showDialog) {
            this.showDialog = true;
        }
    }
}
