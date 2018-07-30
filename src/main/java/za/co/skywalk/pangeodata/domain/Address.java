package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Document(collection = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("current")
    private String current;

    @Field("start_date")
    private String startDate;

    @Field("country")
    private String country;

    @Field("end_date")
    private String endDate;

    @Field("town")
    private String town;

    @Field("address_1")
    private String address1;

    @Field("address_2")
    private String address2;

    @Field("postal_code")
    private String postalCode;

    @Field("province")
    private String province;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCurrent() {
        return current;
    }

    public Address current(String current) {
        this.current = current;
        return this;
    }

    public void setCurrent(String current) {
        this.current = current;
    }

    public String getStartDate() {
        return startDate;
    }

    public Address startDate(String startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getCountry() {
        return country;
    }

    public Address country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEndDate() {
        return endDate;
    }

    public Address endDate(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTown() {
        return town;
    }

    public Address town(String town) {
        this.town = town;
        return this;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getAddress1() {
        return address1;
    }

    public Address address1(String address1) {
        this.address1 = address1;
        return this;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public Address address2(String address2) {
        this.address2 = address2;
        return this;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Address postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getProvince() {
        return province;
    }

    public Address province(String province) {
        this.province = province;
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        if (address.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), address.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", current='" + getCurrent() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", country='" + getCountry() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", town='" + getTown() + "'" +
            ", address1='" + getAddress1() + "'" +
            ", address2='" + getAddress2() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
