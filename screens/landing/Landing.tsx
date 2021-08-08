// react
import React, { useState, useEffect } from "react"

// react-native
import {
	View, ViewStyle, StatusBar, FlatList, Text, TextStyle, TouchableOpacity, Keyboard, ActivityIndicator
} from "react-native";

// third-party
import { NavigationScreenProps } from "react-navigation";

// redux
import { fetchAllAssetsAsync, fetchAllMetricsAsync } from "../../redux/startup";
import useReduxStore from '../../redux/utils/hooks/useRedux';

// components
import { TextField } from "../../components/text-field";
import { Header } from "../../components/header";


// styles
import { Layout } from "../../constants";
import { colors } from "../../theme";
import { translate } from "../../i18n";


interface LandingScreenProps extends NavigationScreenProps {}

type Props = LandingScreenProps

const ROOT: ViewStyle = {
    width: Layout.window.width,
	height: '100%',
    backgroundColor: colors.white,
};

const TITLE: TextStyle = {
    color: colors.companyBlue,
    marginLeft: 20,
    fontSize: 20
};

const HEADER: TextStyle = {
    color: colors.companyDarkGreen
};

const BODY: TextStyle = {
    color: colors.companyDarkGreen,
    marginTop: 10,
    width: '50%'
};

const Landing = (props: Props) => {
    const { navigation } = props

    // redux
    const [dispatch, selectStore] = useReduxStore('startup');
    const allAssets = selectStore('allAssets');
    const allMetrics = selectStore('allMetrics');
    const loading = selectStore('loading');
    const [assetsWithMetrics, setAssetsWithMetrics] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState([]);
    const [selectedMetric, setSelectedMetric] = useState([]);
    const [searchAssetKey, setAssetKey] = useState('');
    const [searchMetricKey, setMetricKey] = useState('');

    // lifecycle
    useEffect(() => {
        dispatch(fetchAllAssetsAsync())
        dispatch(fetchAllMetricsAsync())
    }, [])

    useEffect(() => {
        StatusBar.setBarStyle("dark-content")
    })

    useEffect(() => {
        resetData()
    }, [allMetrics, allAssets])

    // methods
    const searchForAssets = (searchkey: string) => {
        let myAssets = allAssets !== undefined  && allAssets["data"] !== undefined && allAssets["data"].filter((asset) => {
            return asset.full_name.includes(searchkey.toLocaleLowerCase()) || asset.asset === searchkey.toLocaleLowerCase() && asset;
        });

        setAssetsWithMetrics(myAssets)
    }

    const searchForMetric = (searchkey: string) => {
        let myMetric = allMetrics !== undefined  && allMetrics["data"] !== undefined && allMetrics["data"].filter((metric) => {
            return metric.metric.toLowerCase().includes(searchkey.toLocaleLowerCase())
        });
        setMetrics(myMetric)
    }

    const resetData = () => {
        let myAssets = allAssets !== undefined  && allAssets["data"] !== undefined && allAssets["data"].filter((asset) => {
            return asset.metrics && asset;
        });
        setAssetsWithMetrics(myAssets)
        setMetrics(allMetrics["data"])
    }

    // Views
    const renderAllAssets = ({ item }: any) => {

        const { asset, full_name } = item
 
        return (
            <TouchableOpacity
                onPress={() => {
                    setMetrics(item.metrics)
                    setSelectedAsset(item)
                    setSelectedMetric([])
                }}
                style={{
                    paddingLeft: 10,
                    marginVertical: 10,
                    backgroundColor: selectedAsset === item ? colors.lightBlue : colors.white
                }}
            >
                <Text
                    style={HEADER}
                >
                    {asset}
                </Text>

                <Text
                    style={BODY}
                    numberOfLines={3}
                >
                    {full_name}
                </Text>
            </TouchableOpacity>
        )
    }

    // Views
    const renderAllMetrics = ({ item }: any) => {

        const { metric } = item

        return (
            <TouchableOpacity
                onPress={() => {
                    let myAssets = allAssets["data"] !== undefined && allAssets["data"].filter((asset) => {
                        return asset.metrics && asset;
                    });

                    let filtered = []

                    let filteredAssets = myAssets.filter((asset) => {
                        Object.keys(asset).forEach((assetMetric) => {
                            let save = false;

                            for(let assetWithMetric in asset[assetMetric]) {
                                if (asset[assetMetric][assetWithMetric]["metric"] !== undefined && asset[assetMetric][assetWithMetric]["metric"] === metric) {
                                    save = true
                                    break
                                } else {
                                    save = false
                                    break
                                }
                            }

                            return save && filtered.push(asset)
                        })
                    })

                    setAssetsWithMetrics(filtered)
                    setSelectedMetric(item)   
                    setSelectedAsset([])
                }}
                style={{
                    paddingVertical: 10,
                    marginVertical: 10,
                    backgroundColor: selectedMetric === item ? colors.lightBlue : colors.white
                }}
            >
                <Text
                    style={HEADER}
                >
                    {metric}
                </Text>
            </TouchableOpacity>
        )
    }

    if (loading) {
        return(
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return(
        <View
            style={ROOT}
        >
            <Header
                navigation={navigation}
                titleStyle={{
                    color: colors.companyDarkGreen
                }}
                titleTx={'common.appName'}
                onRightPress={() => {
                    resetData()
                    setAssetKey('')
                    setMetricKey('')
                }}
                rightIcon="restIcon"
            />

            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        width: '50%'
                    }}
                >
                    <Text
                        style={TITLE}
                    >
                        {translate('landing.assets')}
                    </Text>

                    <View
                        style={{
                            marginHorizontal: 20,
                            marginVertical: 10,
                        }}
                    >
                        <TextField
                            name="walletAddress"
                            keyboardType="default"
                            value={searchAssetKey}
                            onChangeText={(key) => {
                                setAssetKey(key)
                                searchForAssets(key)
                            }}
                            autoCapitalize="words"
                            returnKeyType="next"
                            placeholder={translate('landing.searchAssets')}
                            placeholderTextColor={colors.dotColor}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            style={{
                                borderColor: colors.settingsSubView
                            }}
                            inputStyle={{
                                color: colors.companyDarkGreen
                            }}
                        />
                    </View>  

                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={assetsWithMetrics}
                            renderItem={renderAllAssets}
                            contentContainerStyle={{
                                paddingHorizontal: 20,
                                paddingBottom: 200
                            }}
                        />

                    </View>
                </View>

                <View>
                    <Text
                        style={TITLE}
                    >
                        {translate('landing.metric')}
                    </Text>

                    <View
                        style={{
                            marginHorizontal: 20,
                            marginVertical: 10
                        }}
                    >
                        <TextField
                            name="walletAddress"
                            keyboardType="default"
                            value={searchMetricKey}
                            onChangeText={(key) => {
                                setMetricKey(key)
                                searchForMetric(key)
                            }}
                            autoCapitalize="words"
                            returnKeyType="next"
                            placeholder={translate('landing.searchMetric')}
                            placeholderTextColor={colors.dotColor}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            style={{
                                borderColor: colors.settingsSubView,
                            }}
                            inputStyle={{
                                color: colors.companyDarkGreen,
                            }}
                        />
                    </View>

                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={metrics}
                            renderItem={renderAllMetrics}
                            contentContainerStyle={{
                                paddingBottom: 200
                            }}
                        />
                    </View>
                </View>

            </View>
            
		</View>
    )

}

export const LandingScreen = Landing