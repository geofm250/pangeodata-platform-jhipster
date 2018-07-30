package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProductCountry.
 */
@Document(collection = "product_country")
public class ProductCountry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("turn_around_time")
    private String turnAroundTime;

    @Field("country")
    private String country;

    @Field("cost")
    private String cost;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTurnAroundTime() {
        return turnAroundTime;
    }

    public ProductCountry turnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
        return this;
    }

    public void setTurnAroundTime(String turnAroundTime) {
        this.turnAroundTime = turnAroundTime;
    }

    public String getCountry() {
        return country;
    }

    public ProductCountry country(String country) {
        this.country = country;
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCost() {
        return cost;
    }

    public ProductCountry cost(String cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(String cost) {
        this.cost = cost;
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
        ProductCountry productCountry = (ProductCountry) o;
        if (productCountry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productCountry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductCountry{" +
            "id=" + getId() +
            ", turnAroundTime='" + getTurnAroundTime() + "'" +
            ", country='" + getCountry() + "'" +
            ", cost='" + getCost() + "'" +
            "}";
    }
}
