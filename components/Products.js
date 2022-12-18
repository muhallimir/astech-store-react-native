import { SafeAreaView } from 'react-native'
import ProductCard from './ProductCard'
import data from '../utils/data'
import { ScrollView } from 'react-native-gesture-handler'

export default function Products() {

    return (
        <SafeAreaView className="flex-1">
            <ScrollView vertical={true} className='w-full'>
                <ProductCard data={data} />
            </ScrollView>
        </SafeAreaView >
    )
}