import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'

const STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

const stepIndex = (status) => {
    const idx = STEPS.findIndex((s) => s.toLowerCase() === String(status || '').toLowerCase());
    return idx === -1 ? 0 : idx;
};

const formatEta = (value) => {
    if (!value) {
        return 'To be determined';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return date.toLocaleString();
};

export default function OrderTrackingScreen() {
    const { params } = require('@react-navigation/native').useRoute();
    const { orderId, status = 'Pending', estimatedDelivery, items = [] } = params || {};

    const currentStep = stepIndex(status);

    return (
        <SafeAreaView style={styles.safe}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.heading}>Order Tracking</Text>
                <Text style={styles.orderId}>Order ID: {orderId || 'N/A'}</Text>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{status}</Text>
                </View>

                <Text style={styles.etaLabel}>Estimated delivery</Text>
                <Text style={styles.etaValue}>{formatEta(estimatedDelivery)}</Text>

                <Text style={styles.sectionTitle}>Status</Text>
                <View style={styles.timeline}>
                    {STEPS.map((step, idx) => {
                        const reached = idx <= currentStep;
                        const isCurrent = idx === currentStep;
                        return (
                            <View key={step} style={styles.timelineRow}>
                                <View style={styles.timelineMarkerColumn}>
                                    <View
                                        style={[
                                            styles.marker,
                                            reached ? styles.markerActive : styles.markerInactive,
                                            isCurrent ? styles.markerCurrent : null,
                                        ]}
                                    />
                                    {idx < STEPS.length - 1 && (
                                        <View
                                            style={[
                                                styles.connector,
                                                idx < currentStep ? styles.connectorActive : styles.connectorInactive,
                                            ]}
                                        />
                                    )}
                                </View>
                                <View style={styles.timelineContent}>
                                    <Text
                                        style={[
                                            styles.stepLabel,
                                            isCurrent ? styles.stepLabelCurrent : null,
                                            reached ? styles.stepLabelReached : null,
                                        ]}
                                    >
                                        {step}
                                    </Text>
                                    {isCurrent && <Text style={styles.currentHint}>Current step</Text>}
                                </View>
                            </View>
                        );
                    })}
                </View>

                <Text style={styles.sectionTitle}>Items in this order</Text>
                {items.length === 0 ? (
                    <Text style={styles.empty}>No items to display</Text>
                ) : (
                    items.map((item, idx) => (
                        <View key={`${item.product || item._id || idx}`} style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.name || 'Item'}</Text>
                            <Text style={styles.itemMeta}>Qty: {item.qty || 1}</Text>
                            {item.price != null && (
                                <Text style={styles.itemMeta}>Price: ${item.price}</Text>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        padding: 16,
        paddingBottom: 80,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 12,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#1e3a8a',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 16,
    },
    statusBadgeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    etaLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    etaValue: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 12,
        marginTop: 8,
    },
    timeline: {
        marginBottom: 24,
    },
    timelineRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    timelineMarkerColumn: {
        alignItems: 'center',
        width: 32,
    },
    marker: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
    },
    markerActive: {
        backgroundColor: '#1e3a8a',
        borderColor: '#1e3a8a',
    },
    markerInactive: {
        backgroundColor: '#ffffff',
        borderColor: '#9ca3af',
    },
    markerCurrent: {
        borderColor: '#fbbf24',
        borderWidth: 4,
    },
    connector: {
        width: 2,
        flex: 1,
        minHeight: 32,
    },
    connectorActive: {
        backgroundColor: '#1e3a8a',
    },
    connectorInactive: {
        backgroundColor: '#d1d5db',
    },
    timelineContent: {
        flex: 1,
        paddingLeft: 12,
        paddingBottom: 16,
    },
    stepLabel: {
        fontSize: 16,
        color: '#9ca3af',
    },
    stepLabelReached: {
        color: '#1e3a8a',
    },
    stepLabelCurrent: {
        fontWeight: 'bold',
    },
    currentHint: {
        fontSize: 12,
        color: '#fbbf24',
        fontWeight: 'bold',
    },
    itemRow: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    itemMeta: {
        fontSize: 14,
        color: '#374151',
    },
    empty: {
        color: '#9ca3af',
        fontStyle: 'italic',
    },
});
