import m from 'mithril';
import API from '../api';

export const MUser = function(data) {
    data = data || {};

    this.id = m.prop(data.id || false);
    this.names = m.prop(data.names || ""),
    this.surnames = m.prop(data.surnames || ""),
    this.email = m.prop(data.email || ""),
    this.password = m.prop(data.password || ""),
    this.type_document_id = m.prop(data.type_document_id || false),
    this.number_document = m.prop(data.number_document || ""),
    this.phone = m.prop(data.phone || "")

}


export const MVehicle = function(data) {
    data = data || {};

    this.id = m.prop(data.id || false);
    this.subtype_vehicle_id = m.prop(data.subtype_vehicle_id || false);
    this.type_vehicle = 0; // pendiente petición
    this.age = m.prop(data.age || ""); 
    this.user_id = m.prop(data.user_id || false);
    this.n_passengers = m.prop(data.n_passengers || "");
    this.cylinder = m.prop(data.cylinder || "");
    this.tonnes = m.prop(data.tonnes || "");


}


export const MSoat = function(data) {
    data = data || {};

    this.id = m.prop(data.id || false);
    this.vehicle_id = m.prop(data.vehicle_id || false);
    this.number_cart = m.prop(data.number_cart || "");
    this.holder_cart = m.prop(data.holder_cart || "");
    this.date_end_cart =  m.prop(data.date_end_cart || "");
    this.code_card = m.prop(data.code_card || "");
    this.number_quotas = m.prop(data.number_quotas || 1);
    let created_at = data.created_at || '--';
    this.created_at = m.prop(created_at.substring(0,10));
    this.expiration = m.prop('--'); // pendiente sumar año a created_at

}


