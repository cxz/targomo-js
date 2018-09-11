/**
 * A map coordinate
 */
export class LatLng {
  lat: number
  lng: number
  elevation?: number
}



/**
 * A map bounding box
 */
export class BoundingBox {
  northEast: LatLng
  southWest: LatLng
}

/**
 * Types for the `properties` part of a LatLngProperties object. The defined, non exhaustive, list contains some of the properties that
 * have meaning in various @targomo/client components
 */
export interface LatLngPropertiesObject {
  'marker-type'?: string
  'marker-size'?: number

  /**
   * Used by @targomo/client components to decide if a marker representing the location is active
   */
  'marker-active'?: boolean

  /**
   * Used by @targomo/client components to decide if a marker representing the location is draggable
   */
  'marker-draggable'?: boolean

  /**
   * Used by @targomo/client components to decide if a marker representing the location is clickable
   */
  'marker-clickable'?: boolean

  [index: string]: any
}

/**
 * A location on a map that
 */
export interface LatLngProperties extends LatLng {
  properties: LatLngPropertiesObject
}

export interface LatLngIdProperties extends LatLngProperties {
  id: any
}


/**
 *
 */
export type ReachableTile = { [index: number]: number }

/**
 * The available statistics groups of the statistic service and the vector tiles service
 */
export enum StatisticsSet {
  GERMANY_ZENSUS_100M_STATISTICS = 9,
  GERMANY_ZENSUS_200M_STATISTICS = 2,
  GERMANY_ZENSUS_500M_STATISTICS = 11,
  GERMANY_ZENSUS_1000M_STATISTICS = 3,
  GERMANY_ZENSUS_2000M_STATISTICS = 10,
  NORWAY_STATISTICS = 4,
  CENSUS_BRANDENBURG_POPULATION = 12,
  CANADA_BLOCK_STATISTICS = 8,
  CANADA_AREA_STATISTICS = 5,
  BERLIN_STATISTICS = 6,
}

/**
 *
 */
export type TravelSpeed = 'slow' | 'medium' | 'fast'

/**
 *
 */
export type TravelType = 'walk' | 'car' | 'bike' | 'transit'


export class TravelSpeedValues {
  speed?: number
  uphill?: number
  downhill?: number
}

/**
 *
 */
export type EdgeWeightType = 'time' | 'distance'

/**
 * @hidden
 */
export interface GeoSearchDescription {
  title: string
  meta1: string
  meta2: string
  full: string
}

/**
 * A specific statistics index/name for making a statistics request
 */
export interface StatisticsKey {
  id: number
  name: string
}

/**
 *
 */
export interface LabelStatisticsKey extends StatisticsKey {
  label: string
}

/**
 *
 */
export interface ExtendedStatisticsKey extends LabelStatisticsKey {
  /**
   * Can this statistic be displayed as a chart
   */
  chart: boolean

  /**
   * What kind of value does this statistic represent
   */
  type: 'value' | 'percent' | 'average'
}

/**
 * A number of travelTime -> value returned by a statistics call
 */
export interface StatisticsValues {
  [time: number]: number
}

/**
 *A result object for a specific statistic
 */
export class Statistics {
  readonly total: number

  constructor(readonly values: StatisticsValues) {
    this.total = 0
    for (const key in this.values) {
      this.total += this.values[key]
    }
  }

  // total: number
  // percent: number
  // average: number
}

export interface MatrixOptimizationOptions {
  pointsPerSolution: number,
  maxSolutions: number,
  statistic: StatisticsKey,
  name?: string
  description?: string
  statisticsGroup: StatisticsSet
}

/**
 * A map of name->Statistics object returned from a statistics request
 */
export type StatisticsGroup = { [index: string]: Statistics }

export enum SRID {
  SRID_3857 = 3857,
  SRID_4326 = 4326
}

/**
 *
 */
export interface BenchmarkCriteria {
  source: string,
  minEnd: number,
  minStart: number
  factor: number
}

/**
 *
 */
export interface SimilarityCriteria {
  source: string,
  minutes: number,
  factor: number
}

/**
 * A lat, lng position with the addition of an id
 */
export interface LatLngId {
  id: any
  lat: number
  lng: number
}

/**
 * A LatLngId decorated with a travel time, usually return from an r360 service
 */
export interface LatLngIdTravelTime extends LatLngId {
  travelTime?: number
}

/**
 * Describes metadata about a single statistic in a StatisticsSet
 */
export interface StatisticsKeyMeta {
  statistic_id: number
  min: number
  max: number
  avg: number
  type: string
  names: { [index: string]: string }
  descriptions: { [index: string]: string }
  breakpoints: any
}

/**
 * Describes metadata about a specific StatisticsSet (details https://service.route360.net/vector-statistics/statistics/list/v1)
 */
export interface StatisticsSetMeta {
  id: number
  table: string
  srid: SRID
  type: string
  source: string
  stats: StatisticsKeyMeta[]
}

/**
 * Padding object
 * @param {number} top The padding to apply to map top.
 * @param {number} bottom The padding to apply to map bottom.
 * @param {number} left The padding to apply to map left.
 * @param {number} right The padding to apply to map right.
 */
export interface PaddingObject {
  top?: number,
  bottom?: number,
  left?: number,
  right?: number
}

/**
 * Options object for setBounds function
 * @param {PaddingObject} padding The padding to apply to map on bounds fit.
 */
export interface SetBoundsOptions {
  padding?: PaddingObject
}

/**
 * Object that will be passed to a request as source
 */
export interface LatLngIdTravelMode extends LatLngId {
  tm?: any
}

/**
 * Osm Type (OSM map feature tags. See: http://wiki.openstreetmap.org/wiki/Map_Features)
 */
export interface OSMType {
  key: string
  value: string
}


export interface ReachabilityResult {
  id: string
  source: string
  travelTime: number
}

export interface TimeResult {
  id: string
  targets: {
    id: string
    travelTime: number
  }[]
}

/**
 * A store (also called 'depot' sometimes) to which the respective vehicles/transports and orders are associated.
 * Each store will be optimized individually and independently.
 */
export interface Store {
  /**
   *  Unique ID that is required to be set so that Order and Vehicle can reference to their respective store.
   */
  uuid: string;
  /**
   * Name of the store - cannot be longer than 256 chars.
   */
  name?: string;
  /**
   * Location of the store. For store addresses the geocoordinates(lat, lng) must exist already.
   */
  address: Address;
}

/**
 * Stores, Orders, and Transports/Vehicles have addresses associated to determine their location.
 * Preferably these addresses are already geocoded in the WGS84 format (in lat, lng).
 * Otherwise, the geocoordinates are calculated during the request from the other address details (street, city, etc.).
 * This only happens for order addresses. For store and start or endDestination addresses geocoordinates (lat, lng) must exist already.
 */
export interface Address {
  /**
   * Unique ID
   */
  uuid?: string;
  /**
   * Amount of time it takes to carry out the order for this address in seconds.
   * This value is only important for addresses in orders.
   * - default: 0
   */
  avgHandlingTime?: number;
  /**
   * Latitude of the geocoordinates in the WGS84 format of the the address.
   * This is required for addresses in store and transport.
   */
  lat?: number;
  /**
   * Longtitude of the geocoordinates in the WGS84 format of the the address.
   * This is required for addresses in store and transport.
   */
  lng?: number;
  name?: string;
  street?: string;
  streetDetails?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  phone?: string;
}

/**
 * The order object describes the entities that need to be serviced by the transports of the same associated store.
 * - The physical units for weight and volume must match the units of maxWeight and maxVolume in Vehicle.
 * - It is not allowed to have a single Order whose weight or volume is larger than maxWeight or maxVolume of any Vehicle.
 * - In addition, the total weight or volume of all Orders of a Store must not exceed
 * the total of maxWeight or maxVolume of its associated Vehicles.
 * - It is sufficient to specify an order’s address without geo-coordinates.
 * The missing information is derived from the address details via geocoding.
 * This can lead to small runtime impairments for many addresses, since the geocoding accesses an external service.
 * The resulting geodata must not be saved.
 */
export interface Order {
  /**
   * To map the order entity back to the original after the request.
   */
  uuid?: string;
  /**
   * To associate the order entity to a store. This id must be identical with one of the uuids in the store objects.
   */
  storeUuid: string;
  /**
   * The location of the order.
   */
  address: Address;
  /**
   * The deadline (time and date) for an order to be serviced. Expressed according to ISO 8601.
   * The optimization algorithm tries to minimize the amount of deadlines that are not kept.
   */
  deadline?: string;
  /**
   * The priority specifies the priority of an order. This has effects on:
  * - Validation: If the order number or the total order volume/weight is too high,
  * first orders with a lower rather than a higher priority are removed.
  * - Optimization: It is preferable to try to keep the deadlines of orders with higher priority.
  * Here, the priority of the order represents the number of penalty points it accrues for not meeting the order’s deadline.
  * For example, not meeting a deadline of an order with priority 10 is penalty-equivalent with not meeting the deadline of
  * 10 orders with priority 1. If the optimization is to have priority classes,
  * i.e. orders of a higher priority class are more important than infinitely many orders of a lower priority class,
  * we suggest the usage of a "folding technique": Consider you have 12 orders, 4 of each priority "low", "medium", and "high".
  * The low priority orders are assigned the value 1, the orders with medium priority are assigned the value 5,
  * and the orders with the high priority are assigned the value 25.
  * With this configuration you could always ensure that the meeting of a deadline of one higher priority order is
  * more important than the meeting of deadlines of all lower priority orders.
  * Please note that this technique can cause "NumberOverflow" errors for too many classes and orders.
  * - default: 1
   */
  priority?: number;
  /**
   * Specifies the volume of an order. Should have the same physical unit as maxVolume in Vehicle.
  * It is not allowed to have a single Order whose volume is larger than maxVolume of any Vehicle.
  * In addition, the total volume of all Orders of a Store must not exceed the total of maxVolume of its associated Vehicles.
  * - default: 0
   */
  volume?: number;
  /**
   * Specifies the weight of an order. Should have the same physical unit as maxWeight in Vehicle.
  * It is not allowed to have a single Order whose weight is larger than maxWeight of any Vehicle.
  * In addition, the total weight of all Orders of a Store must not exceed the total of maxWeight of its associated Vehicles.
  * - default: 0
   */
  weight?: number;
  /**
   * A potential service comment for that order. Length cannot exceed 5000 chars.
   */
  comments?: string;
}

/**
 * A transport is the entity which services the orders and for which the optimization finds the best order allocations
 * as well as the best routes.
 * @param {Vehicle} vehicle The vehicle entity describes the fixed parameters of a transport.
 * @param {TransportMetadata} metadata Metadata defining variable specifics for the vehicle/transports.
 */
export interface Transport {
  vehicle: Vehicle;
  metadata?: TransportMetadata;
}
/**
 * The vehicle entity describes the fixed parameters of a transport.
 * The physical units for maxWeight and maxVolume are of no relevance for the optimization.
 * However, the same units as in weight and volume in Order need to be used.
 * Parameters name, plate, avgFuelConsumption, and fuelType are currently not relevant for the optimization.
 */
export interface Vehicle {
  /**
   * To map the vehicle entity back to the original after the request.
   */
  uuid?: string;
  /**
   * To associate the vehicle entity to a store. This id must be identical with one of the uuids in the store objects.
   */
  storeUuid: string;
  /**
   * The volume capacity of this vehicle. Has to be a positive number.
   * The optimization will return a tour for this vehicle where this value is not exceeded.
   */
  maxVolume: number;
  /**
   * The weight capacity of this vehicle. Has to be a positive number.
   * The optimization will return a tour for this vehicle where this value is not exceeded.
   */
  maxWeight: number;
  name?: string;
  plate?: string;
  avgFuelConsumption?: number;
  fuelType?: string;
}

/**
 * Metadata defining variable specifics for the vehicle/transports.
 */
export interface TransportMetadata {
  /**
   * Specifies from when on the transport would be ready to service the orders,
  * e.g. because right now it is still being refuelled. Expressed according to ISO 8601
  * If no earliestDepartureTime is specified, it is assumed that the vehicle is immediately ready for departure.
  * - default: now
   */
  earliestDepartureTime?: string;
/**
 * The start location of the vehicle. If no start address was specified,
 * the address of the store referenced in the Vehicle is assumed to be the start address of the transport's tour.
 * For start addresses the geocoordinates(lat, lng) must exist already.
 */
  start?: Address ;
  /**
   * The field endDestinations contains the potential end points of the vehicle.
 * The semantics for its configuration is:
 * - List empty: The last delivered order is also the end point of the route.
 * - One list entry: The route must end at this fixed end point.
 * - Multiple list entries: The selection of the best end point is part of the optimization.
 * If multiple endDestinations are specified, finding the best endpoint is part of the optimization.
 * For end destination addresses the geocoordinates(lat, lng) must exist already.
   */
  endDestinations?: Address[];
}

/**
 * Specifies factors with which the travel times of the edges are adjusted.
 * This may be necessary in certain areas where the travel time calculation is almost always off by a certain factor, e.g. Paris rush hour.
 */
export interface TravelTimeFactors {
  /**
   * Has an effect on all edge classes (excluding transit travel times)
   */
  all: number,

  motorway: number,
  motorway_link: number,
  trunk: number,
  trunk_link: number,
  primary: number,
  primary_link: number,
  secondary: number,
  secondary_link: number,
  tertiary: number,
  residential: number,
  tertiary_link: number,
  road: number,
  unclassified: number,
  service: number,
  living_street: number,
  pedestrian: number,
  track: number,
  path: number,
  cycleway: number,
  footway: number,
  steps: number,
  unknown: number
}
